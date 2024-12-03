// src/app/data-access/services/database.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Loki, { Collection } from 'lokijs';
import { environment } from '@environments/environment';
import { ConfigService } from '../../core/services/config.service';
import {
  Project,
  Skill,
  Experience,
  SkillGroup,
  Certification,
  ProjectCategory,
  ProjectStatus,
  SkillCategory
} from '../models/portfolio.models';

// Definiamo un'interfaccia base che tutti i nostri tipi devono implementare
interface BaseEntity {
  id: string;
  [key: string]: any;
}

// Ora possiamo vincolare T a BaseEntity
type CollectionName = 'projects' | 'skills' | 'experiences' | 'skillGroups' | 'certifications';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: Loki | null = null;
  private initialized = false;
  private readonly defaultCollections: CollectionName[] = [
    'projects',
    'skills',
    'experiences'
  ];

  private readonly options = {
    autoload: true,
    autoloadCallback: this.databaseInitialize.bind(this),
    autosave: true,
    autosaveInterval: Math.floor(environment.cache.maxAge / 4), // Un quarto del maxAge
  };

  constructor() {
    if (typeof window === 'undefined') {
      // if (isPlatformBrowser(this.platformId)) {
      console.warn('LokiJS: Disabling filesystem usage and \nUsing memory adapter for SSR.');
      this.db = new Loki('portfolio.db', {
        adapter: new Loki.LokiMemoryAdapter()
      });
    } else {
      this.db = new Loki(environment.dbName, this.options);
    }
  }

  private databaseInitialize(): void {
    console.log('Database initialized');
    try {
      // Inizializza le collezioni predefinite
      this.defaultCollections.forEach(collectionName => {
        if (!this.db?.getCollection(collectionName)) {
          this.db?.addCollection(collectionName, {
            indices: ['id'] as Array<keyof BaseEntity>,
            unique: ['id'] as Array<keyof BaseEntity>
          });
        }
      });
      this.initialized = true;
      console.log('All collections initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
      this.initialized = false;
    }
  }

  // metodo per creare o ottenere una collezione
  private ensureCollection<T extends BaseEntity>(name: CollectionName): Collection<T> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    let collection = this.db.getCollection<T>(name);
    if (!collection) {
      collection = this.db.addCollection<T>(name, {
        indices: ['id'] as Array<keyof BaseEntity>,
        unique: ['id'] as Array<keyof BaseEntity>
      });
    }
    return collection;
  }

  /**
   * Waits for the database to be initialized before proceeding.
   *
   * This method checks the initialization status of the database at regular intervals.
   * If the database is already initialized, it returns immediately.
   * Otherwise, it sets up a polling mechanism to check the status every 100ms.
   *
   * @returns A Promise that resolves when the database is initialized.
   */
  async waitForInitialization(): Promise<void> {
    if (this.initialized) return;
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.initialized) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  async upsertData<T extends BaseEntity>(
    collectionName: CollectionName,
    data: T
  ): Promise<T> {
    try {
      await this.waitForInitialization();
      this.validateData(data);

      const collection = this.ensureCollection<T>(collectionName);
      const existing = collection.findOne({ id: data.id } as any) as T | null;

      if (existing) {
        Object.assign(existing, data);
        collection.update(existing);
        return existing;
      } else {
        return collection.insert(data) as T;
      }
    } catch (error) {
      console.error(`Error upserting data in ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Retrieves data from a specified collection based on an optional query.
   *
   * @typeParam T - The type of entity being retrieved, which must extend BaseEntity.
   * @param collectionName - The name of the collection to query.
   * @param query - An optional partial object of type T to filter the results. Default is an empty object.
   * @returns A promise that resolves to an array of entities of type T matching the query.
   * @throws Will throw an error if there's a problem accessing the database or if the collection doesn't exist.
   */
  async getData<T extends BaseEntity>(
    collectionName: CollectionName,
    query: Partial<T> = {}
  ): Promise<T[]> {
    try {
      await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      return collection.find(query as any) as T[];
    } catch (error) {
      console.error(`Error getting data from ${collectionName}:`, error);
      throw error;
    }
  }

  async getById<T extends BaseEntity>(
    collectionName: CollectionName,
    id: string
  ): Promise<T | null> {
    try {
    await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      return collection.findOne({ id } as any) as T | null;
    } catch (error) {
      console.error(`Error getting item by id from ${collectionName}:`, error);
      throw error;
    }
  }

  async deleteData<T extends BaseEntity>(
    collectionName: CollectionName,
    id: string
  ): Promise<void> {
    try {
      await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      collection.findAndRemove({ id } as any);
    } catch (error) {
      console.error(`Error deleting data from ${collectionName}:`, error);
      throw error;
    }
  }

  private validateData<T extends BaseEntity>(data: T): void {
    if (!data) {
      throw new Error('Invalid data: data object is required');
    }

  // Verifica che l'id sia presente
  if (!data.id) {
      throw new Error('Invalid data: id is required');
    }

  // Verifica che l'id sia una stringa
    if (typeof data.id !== 'string') {
      throw new Error('Invalid data: id must be a string');
    }

  // Verifica che l'id non sia vuoto o contenga solo spazi
    if (data.id.trim() === '') {
      throw new Error('Invalid data: id cannot be empty');
    }
  }
}
