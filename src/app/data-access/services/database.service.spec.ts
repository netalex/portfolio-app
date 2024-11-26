// src/app/data-access/services/database.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { isPlatformServer } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

// Interfaccia per i dati di test
interface TestData {
  id: string;
  name: string;
}

describe('DatabaseService', () => {
  let service: DatabaseService;
  const TEST_COLLECTION = 'test_collection';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(DatabaseService);
  });

  afterEach(async () => {
    // Pulizia dopo ogni test
    await service.clearCollection(TEST_COLLECTION);
  });

  // Test base originali
  it('should initialize database', async () => {
    await service.waitForInitialization();
    const collection = service.getCollection(TEST_COLLECTION);
    expect(collection).toBeTruthy();
  });

  it('should perform CRUD operations', async () => {
    // Create
    const testData: TestData = { id: '1', name: 'Test' };
    const created = await service.upsertData<TestData>(TEST_COLLECTION, testData);
    expect(created).toEqual(testData);

    // Read
    const readData = await service.getData<TestData>(TEST_COLLECTION);
    expect(readData.length).toBe(1);
    expect(readData[0]).toEqual(testData);

    // Update
    const updatedData: TestData = { ...testData, name: 'Updated' };
    const updated = await service.upsertData<TestData>(TEST_COLLECTION, updatedData);
    expect(updated.name).toBe('Updated');

    // Verify Update
    const afterUpdate = await service.getData<TestData>(TEST_COLLECTION);
    expect(afterUpdate[0].name).toBe('Updated');

    // Delete (clear)
    await service.clearCollection(TEST_COLLECTION);
    const afterClear = await service.getData<TestData>(TEST_COLLECTION);
    expect(afterClear.length).toBe(0);
  });

  it('should handle multiple records', async () => {
    const testData1: TestData = { id: '1', name: 'Test 1' };
    const testData2: TestData = { id: '2', name: 'Test 2' };

    await service.upsertData<TestData>(TEST_COLLECTION, testData1);
    await service.upsertData<TestData>(TEST_COLLECTION, testData2);

    const allData = await service.getData<TestData>(TEST_COLLECTION);
    expect(allData.length).toBe(2);
    expect(allData.map(d => d.id).sort()).toEqual(['1', '2']);
  });

  it('should handle invalid data', async () => {
    const invalidData = { name: 'No ID' }; // Rimuovi il cast a TestData
    try {
      await service.upsertData(TEST_COLLECTION, invalidData as any);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBeTruthy();
      expect((error as Error).message).toContain('Invalid data');
    }
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
    it('should initialize default collections', async () => {
      await service.waitForInitialization();

      const expectedCollections = ['projects', 'skills', 'experiences'];

      for (const collectionName of expectedCollections) {
        const collection = service.getCollection(collectionName);
        // Prima verifichiamo che la collezione esista
        expect(collection).toBeTruthy();
        // Poi verifichiamo che abbia gli indici corretti se li supporta
        if (collection) {
          // Verifichiamo che la collezione supporti la ricerca per id
          expect(collection.by('id')).toBeDefined();
        }
      }
    });

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
        providers: [DatabaseService, { provide: PLATFORM_ID, useValue: 'server' }],
      });
      ssrService = TestBed.inject(DatabaseService);
    });

    it('should provide mock data in SSR mode', async () => {
      expect(ssrService.getCollection(TEST_COLLECTION)).toBeTruthy();
      const data = await ssrService.getData(TEST_COLLECTION);
      expect(Array.isArray(data)).toBeTruthy();
    });

    it('should handle SSR to client transition', async () => {
      // Dati di test
      const prerenderedData = { id: 'pre-1', name: 'Prerendered' };

      // Prima testiamo il lato server
      await ssrService.upsertData(TEST_COLLECTION, prerenderedData);
      const serverData = await ssrService.getData(TEST_COLLECTION);
      expect(serverData.length).toBe(1);
      expect(serverData[0]).toEqual(prerenderedData);

      // Poi testiamo il lato client (usando il service già configurato nel beforeEach principale)
      const clientData = await service.getData(TEST_COLLECTION);
      expect(Array.isArray(clientData)).toBeTruthy();
    });
  });
});
