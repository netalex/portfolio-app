// src/app/data-access/services/database.service.ts
import { Injectable } from '@angular/core';
import Loki, { Collection } from 'lokijs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: Loki;
  private initialized = false;
  private readonly options = {
    autoload: true,
    autoloadCallback: this.databaseInitialize.bind(this),
    autosave: true,
    autosaveInterval: Math.floor(environment.cache.maxAge / 4), // Un quarto del maxAge
  };

  constructor() {
    if (typeof window === 'undefined') {
      console.warn('LokiJS: Disabling filesystem usage for SSR.');
      this.db = new Loki('portfolio.db', {
        adapter: new Loki.LokiMemoryAdapter()
      });
      // this.db = null as any; // Placeholder lato server
    } else {
    this.db = new Loki(environment.dbName, this.options);}
  }

  private databaseInitialize(): void {
  try {
    if (!this.db.getCollection('projects')) {
      this.db.addCollection('projects', { indices: ['id'] });
    }
    if (!this.db.getCollection('skills')) {
      this.db.addCollection('skills', { indices: ['id'] });
    }
    if (!this.db.getCollection('experiences')) {
      this.db.addCollection('experiences', { indices: ['id'] });
    }
    this.initialized = true;
  } catch (error) {
    console.error('Error initializing database:', error);
    this.initialized = false; // Prevent infinite wait
  }
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

  getCollection(name: string): Collection<any> {
    return this.db.getCollection(name);
  }

  async upsertData<T extends { id: string }>(
    collectionName: string,
    data: T
  ): Promise<T> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    const existing = collection.findOne({ id: data.id });

    if (existing) {
      Object.assign(existing, data);
      collection.update(existing);
      return existing;
    } else {
      return collection.insert(data);
    }
  }

  async getData<T>(
    collectionName: string,
    query: object = {}
  ): Promise<T[]> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    return collection.find(query);
  }

  async clearCollection(collectionName: string): Promise<void> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    collection.clear();
  }
}
