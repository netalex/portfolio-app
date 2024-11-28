// src/app/data-access/services/database.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Loki, { Collection } from 'lokijs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: Loki | null = null;
  private initialized = false;
  private readonly options = {
    autoload: true,
    autoloadCallback: this.databaseInitialize.bind(this),
    autosave: true,
    autosaveInterval: Math.floor(environment.cache.maxAge / 4), // Un quarto del maxAge
  };

  // Lista delle collezioni predefinite
  private readonly defaultCollections = ['projects', 'skills', 'experiences'];

  constructor() {
    if (typeof window === 'undefined') {
      // if (isPlatformBrowser(this.platformId)) {
      console.warn('LokiJS: Disabling filesystem usage for SSR.');
      this.db = new Loki('portfolio.db', {
        adapter: new Loki.LokiMemoryAdapter()
      });
      // this.db = null as any; // Placeholder lato server
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
          this.db?.addCollection(collectionName, { indices: ['id'] });
        }
      });
      this.initialized = true;
      console.log('Initialization complete');
    } catch (error) {
      console.error('Error initializing database:', error);
      this.initialized = false;
    }
  }

  // Nuovo metodo per creare o ottenere una collezione
  private ensureCollection(name: string): Collection<any> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    let collection = this.db.getCollection(name);
    if (!collection) {
      collection = this.db.addCollection(name, { indices: ['id'] });
    }
    return collection;
  }

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

  getCollection(name: string): Collection<any> | null {
    if (!this.db) return null;
    return this.db.getCollection(name) || this.ensureCollection(name);
  }

  async upsertData<T extends { id: string }>(
    collectionName: string,
    data: T
  ): Promise<T> {
    try {
      await this.waitForInitialization();

      this.validateData(data);

      const collection = this.getCollection(collectionName);
      if (!collection) {
        throw new Error(`Collection ${collectionName} not found`);
      }

      const existing = collection.findOne({ id: data.id }) as T | null;
      if (existing) {
        Object.assign(existing, data);
        collection.update(existing);
        return existing;
      } else {
        return collection.insert(data) as T;
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error('Invalid data');
    }
  }

  async getData<T>(
    collectionName: string,
    query: object = {}
  ): Promise<T[]> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    return (collection?.find(query) || []) as T[];
  }

  async clearCollection(collectionName: string): Promise<void> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    collection?.clear();
  }

  private validateData<T extends { id: string }>(data: T): void {
  // Verifica che l'oggetto dati esista
    if (!data) {
      throw new Error('Invalid data: data object is required');
    }

  // Verifica che l'id sia presente
  if (data.id === null || data.id === undefined) {
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
