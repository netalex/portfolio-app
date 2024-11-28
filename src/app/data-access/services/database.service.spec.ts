// src/app/data-access/services/database.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

// Interfaccia per i dati di test
interface TestData {
  id: string;
  name: string;
  // Aggiungiamo campi opzionali per testare scenari più complessi
  category?: string;
  tags?: string[];
  timestamp?: number;
}

describe('DatabaseService', () => {
  let service: DatabaseService;
  const TEST_COLLECTION = 'test_collection';

  // Aggiungiamo una funzione helper per creare dati di test
  function createTestData(id: string, suffix = ''): TestData {
    return {
      id,
      name: `Test Item ${suffix || id}`,
      category: `Category ${suffix || id}`,
      tags: [`tag1_${suffix || id}`, `tag2_${suffix || id}`],
      timestamp: Date.now()
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  afterEach(async () => {
    // Pulizia dopo ogni test
    await service.clearCollection(TEST_COLLECTION);
  });

  // Test base originali
  describe('Initialization', () => {
    it('should initialize database with default collections', async () => {
      await service.waitForInitialization();
      
      const defaultCollections = ['projects', 'skills', 'experiences'];
      for (const collectionName of defaultCollections) {
        const collection = service.getCollection(collectionName);
        expect(collection).toBeTruthy();
        expect(collection?.name).toBe(collectionName);
      }
    });

    it('should handle initialization errors gracefully', async () => {
      // Simuliamo un errore durante l'inizializzazione
      spyOn(console, 'error').and.stub();
      const errorSpy = spyOn(service as any, 'databaseInitialize').and.throwError('Test error');

      try {
        await service.waitForInitialization();
        fail('Should have thrown an error');
      } catch (error) {
        expect(console.error).toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalled();
      }
    });
  });


  describe('CRUD Operations', () => {
    it('should create and read data', async () => {
      const testData = createTestData('1');
      await service.upsertData(TEST_COLLECTION, testData);
      
      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0]).toEqual(testData);
    });

    it('should update existing data', async () => {
      const originalData = createTestData('1');
      await service.upsertData(TEST_COLLECTION, originalData);

      const updatedData = { ...originalData, name: 'Updated Name' };
      await service.upsertData(TEST_COLLECTION, updatedData);

      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0].name).toBe('Updated Name');
    });

    it('should handle bulk operations efficiently', async () => {
      const items = Array.from({ length: 50 }, (_, i) => createTestData(`${i}`));
      
      const startTime = performance.now();
      await Promise.all(items.map(item => service.upsertData(TEST_COLLECTION, item)));
      const endTime = performance.now();
      
      const insertTime = endTime - startTime;
      console.log(`Bulk insert time: ${insertTime}ms`);
      
      expect(insertTime).toBeLessThan(1000); // Should complete within 1 second
      
      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(items.length);
    });
  });

  describe('Query Performance', () => {
    beforeEach(async () => {
      // Setup test data
      const items = Array.from({ length: 100 }, (_, i) => ({
        ...createTestData(`${i}`),
        category: i % 2 === 0 ? 'even' : 'odd'
      }));
      
      await Promise.all(items.map(item => service.upsertData(TEST_COLLECTION, item)));
    });

    it('should efficiently query with filters', async () => {
      const startTime = performance.now();
      
      const result = await service.getData<TestData>(TEST_COLLECTION, { category: 'even' });
      
      const queryTime = performance.now() - startTime;
      console.log(`Query time: ${queryTime}ms`);
      
      expect(queryTime).toBeLessThan(50); // Should be very fast
      expect(result).toHaveSize(50);
      expect(result.every(item => item.category === 'even')).toBeTrue();
    });
  });

  describe('Error Handling', () => {
    it('should validate data before insertion', async () => {
      const invalidData = [
        { name: 'No ID' },
        { id: null, name: 'Null ID' },
        { id: '', name: 'Empty ID' },
        { id: '   ', name: 'Whitespace ID' },
        { id: 123, name: 'Number ID' }
      ];

      for (const data of invalidData) {
        await expectAsync(
          service.upsertData(TEST_COLLECTION, data as any)
        ).toBeRejected();
      }
    });

    it('should handle collection not found', async () => {
      const result = await service.getData('non_existent_collection');
      expect(result).toEqual([]);
    });
  });

  // Test di validazione originali
  describe('Data Validation', () => {
    it('should handle invalid data formats', async () => {
      const invalidData = { name: 'No ID' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, invalidData as any)
      ).toBeRejectedWithError('Invalid data: id is required');
    });

    it('should validate id field', async () => {
      // Test per null
      const nullIdData = { id: null, name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, nullIdData as any)
      ).toBeRejectedWithError('Invalid data: id is required');

      // Test per id vuoto
      const emptyIdData = { id: '', name: 'Test' };
      await expectAsync(service.upsertData(TEST_COLLECTION, emptyIdData)).toBeRejectedWithError(
        'Invalid data: id cannot be empty'
      );

      // Test per id con spazi
      const whitespaceIdData = { id: '   ', name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, whitespaceIdData)
      ).toBeRejectedWithError('Invalid data: id cannot be empty');

      // Test per tipo non valido
      const numberIdData = { id: 123 as any, name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, numberIdData as any)
      ).toBeRejectedWithError('Invalid data: id must be a string');
    });
  });

  // Nuovi test specifici per il caso d'uso
  describe('Initial Data Loading', () => {

    it('should handle bulk initial data load', async () => {
      const initialData = {
        projects: [
          { id: 'p1', name: 'Project 1' },
          { id: 'p2', name: 'Project 2' },
        ],
        skills: [
          { id: 's1', name: 'Skill 1' },
          { id: 's2', name: 'Skill 2' },
        ],
      };

      await Promise.all([
        ...initialData.projects.map(p => service.upsertData('projects', p)),
        ...initialData.skills.map(s => service.upsertData('skills', s)),
      ]);

      const projects = await service.getData('projects');
      const skills = await service.getData('skills');

      expect(projects.length).toBe(2);
      expect(skills.length).toBe(2);
    });
  });

  describe('Read Performance', () => {
    it('should efficiently retrieve data', async () => {
      const ITEMS_COUNT = 50;
      const MAX_ACCEPTABLE_TIME = 500; // ms - più realistico

      const testItems = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
        id: `test-${i}`,
        name: `Test Item ${i}`,
      }));

      // Misuriamo anche il tempo di inserimento
      const insertStartTime = performance.now();
      await Promise.all(testItems.map(item => service.upsertData(TEST_COLLECTION, item)));
      const insertEndTime = performance.now();
      console.log(`Insert time for ${ITEMS_COUNT} items: ${insertEndTime - insertStartTime}ms`);

      // Test di lettura
      const startTime = performance.now();
      const results = await service.getData(TEST_COLLECTION);
      const endTime = performance.now();
      const readTime = endTime - startTime;

      console.log(`Read time for ${ITEMS_COUNT} items: ${readTime}ms`);

      expect(results.length).toBe(ITEMS_COUNT);
      expect(readTime).toBeLessThan(MAX_ACCEPTABLE_TIME);
    });

    it('should handle filtered queries efficiently', async () => {
      const testItems = [
        { id: '1', name: 'Test 1', category: 'A' },
        { id: '2', name: 'Test 2', category: 'A' },
        { id: '3', name: 'Test 3', category: 'B' },
        { id: '4', name: 'Test 4', category: 'A' },
        { id: '5', name: 'Test 5', category: 'B' },
      ];

      await Promise.all(testItems.map(item => service.upsertData(TEST_COLLECTION, item)));

      const startTime = performance.now();
      const results = await service.getData(TEST_COLLECTION, { category: 'A' });
      const endTime = performance.now();
      const queryTime = endTime - startTime;

      console.log(`Query time for filtered results: ${queryTime}ms`);

      expect(results.length).toBe(3); // Dovrebbe trovare 3 items con category 'A'
      expect(queryTime).toBeLessThan(100);
    });
  });

  describe('SSR Compatibility', () => {
    let ssrService: DatabaseService;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          DatabaseService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      ssrService = TestBed.inject(DatabaseService);
    });

    it('should provide mock data in SSR mode', async () => {
      const testData = createTestData('ssr-1');
      await ssrService.upsertData(TEST_COLLECTION, testData);
      
      const result = await ssrService.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0]).toEqual(testData);
    });

    it('should not persist data between SSR requests', async () => {
      // Prima richiesta SSR
      await ssrService.upsertData(TEST_COLLECTION, createTestData('ssr-1'));
      
      // Simula nuova istanza per seconda richiesta SSR
      const newSsrService = TestBed.inject(DatabaseService);
      const result = await newSsrService.getData<TestData>(TEST_COLLECTION);
      
      expect(result).toHaveSize(0);
    });
  });
});
