// src/app/data-access/services/database.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';

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
      providers: [DatabaseService]
      });
      service = TestBed.inject(DatabaseService);
    });

  afterEach(async () => {
    // Pulizia dopo ogni test
    await service.clearCollection(TEST_COLLECTION);
  });

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

  // it('should validate required fields', async () => {
  //   const nullIdData = { id: null, name: 'Test' };
  //   const emptyIdData = { id: '', name: 'Test' };

  //     await expectAsync(
  //     service.upsertData(TEST_COLLECTION, nullIdData as any)
  //   ).toBeRejectedWithError('Invalid data: id is required');

  //   await expectAsync(
  //     service.upsertData(TEST_COLLECTION, emptyIdData as any)
  //   ).toBeRejectedWithError('Invalid data: id cannot be empty');
  //   });

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
      await expectAsync(
        service.upsertData(TEST_COLLECTION, emptyIdData)
      ).toBeRejectedWithError('Invalid data: id cannot be empty');

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


  });
