// src/app/data-access/services/database.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { PLATFORM_ID } from '@angular/core';

// Interface for test data
interface TestData {
  id: string;
  name: string;
  category?: string;
  tags?: string[];
  timestamp?: number;
}

// Custom error class for database operations
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

describe('DatabaseService', () => {
  let service: DatabaseService;
  const TEST_COLLECTION = 'test_collection';

  // Helper function per creare dati di test consistenti
  // Permette di aggiungere un suffisso per creare dati unici
  function createTestData(id: string, suffix = ''): TestData {
    return {
      id,
      name: `Test Item ${suffix || id}`,
      category: `Category ${suffix || id}`,
      tags: [`tag1_${suffix || id}`, `tag2_${suffix || id}`],
      timestamp: Date.now(),
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

  // Pulizia dopo ogni test per evitare interferenze
  afterEach(async () => {
    await service.clearCollection(TEST_COLLECTION);
  });

  // Suite di test per l'inizializzazione
  describe('Initialization', () => {
    it('should call databaseInitialize during initialization', async () => {
      // Creiamo uno spy sul metodo interno di inizializzazione
      const initSpy = spyOn(service as any, 'databaseInitialize').and.callThrough();
      await service.waitForInitialization();
      expect(initSpy).toHaveBeenCalled();
    });

    it('should set initialized to true after successful initialization', async () => {
      await service.waitForInitialization();
      expect((service as any).initialized).toBeTrue();
    });

    it('should handle initialization errors gracefully', async () => {
      const errorMessage = 'Test initialization error';
      const errorSpy = spyOn(console, 'error');

      // Forziamo un errore durante l'inizializzazione
      const initSpy = spyOn(service as any, 'databaseInitialize')
        .and.throwError(new DatabaseError(errorMessage));

      try {
        await service.waitForInitialization();
        fail('Should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(DatabaseError);
        if (err instanceof DatabaseError) {
          expect(err.message).toBe(errorMessage);
            expect(errorSpy).toHaveBeenCalledWith(
              'Error initializing database:',
            jasmine.any(DatabaseError)
            );
          expect((service as any).initialized).toBeFalse();
        }
      }
    });

    it('should not reinitialize if already initialized', async () => {
      const initSpy = spyOn(service as any, 'databaseInitialize');
      (service as any).initialized = true;
      
      await service.waitForInitialization();
      expect(initSpy).not.toHaveBeenCalled();
    });
  });

  // Suite di test per le operazioni CRUD base
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

  // Suite di test per la validazione dei dati e gestione errori
  describe('Data Validation', () => {
    it('should handle invalid data formats', async () => {
      const invalidData = { name: 'No ID' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, invalidData as any)
      ).toBeRejectedWithError('Invalid data: id is required');
    });

    it('should validate id field', async () => {
      // Test per id null
      const nullIdData = { id: null, name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, nullIdData as any)
      ).toBeRejectedWithError('Invalid data: id is required');

      // Test per id vuoto
      const emptyIdData = { id: '', name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, emptyIdData)
      ).toBeRejectedWithError('Invalid data: id cannot be empty');

      // Test per id con soli spazi
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

  // Suite di test per le performance
  describe('Query Performance', () => {
    beforeEach(async () => {
      // Setup dati di test
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

      expect(queryTime).toBeLessThan(50); // Dovrebbe essere molto veloce
      expect(result).toHaveSize(50);
      expect(result.every(item => item.category === 'even')).toBeTrue();
    });
  });

  // Suite di test per la lettura dei dati
  describe('Read Performance', () => {
    it('should efficiently retrieve data', async () => {
      const ITEMS_COUNT = 50;
      const MAX_ACCEPTABLE_TIME = 500; // ms

      const testItems = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
        id: `test-${i}`,
        name: `Test Item ${i}`
      }));

      // Misuriamo il tempo di inserimento
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
        { id: '5', name: 'Test 5', category: 'B' }
      ];

      await Promise.all(testItems.map(item => service.upsertData(TEST_COLLECTION, item)));

      const startTime = performance.now();
      const results = await service.getData(TEST_COLLECTION, { category: 'A' });
      const endTime = performance.now();
      const queryTime = endTime - startTime;

      console.log(`Query time for filtered results: ${queryTime}ms`);

      expect(results.length).toBe(3);
      expect(queryTime).toBeLessThan(100);
    });
  });

  // Suite di test per la compatibilità SSR
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
      // First SSR request
      const testData = createTestData('ssr-1');
      await ssrService.upsertData(TEST_COLLECTION, testData);

      // Simulate a new SSR request by creating a new instance
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          DatabaseService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });

      const newSsrService = TestBed.inject(DatabaseService);
      await newSsrService.waitForInitialization();
      const result = await newSsrService.getData<TestData>(TEST_COLLECTION);

      expect(result).toEqual([]);
    });
  });

  // Suite di test per il caricamento dati iniziali
  describe('Initial Data Loading', () => {
    it('should handle bulk initial data load', async () => {
      const initialData = {
        projects: [
          { id: 'p1', name: 'Project 1' },
          { id: 'p2', name: 'Project 2' }
        ],
        skills: [
          { id: 's1', name: 'Skill 1' },
          { id: 's2', name: 'Skill 2' }
        ]
      };

      await Promise.all([
        ...initialData.projects.map(p => service.upsertData('projects', p)),
        ...initialData.skills.map(s => service.upsertData('skills', s))
      ]);

      const projects = await service.getData('projects');
      const skills = await service.getData('skills');

      expect(projects.length).toBe(2);
      expect(skills.length).toBe(2);
    });
  });
});