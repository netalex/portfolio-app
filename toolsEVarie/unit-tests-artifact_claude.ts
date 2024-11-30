// services/database.service.spec.ts
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

describe('DatabaseService', () => {
  let service: DatabaseService;
  let initSpy: jasmine.Spy;
  const TEST_COLLECTION = 'test_collection';

  // Helper function for creating test data
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
    initSpy = spyOn(service as any, 'databaseInitialize').and.callThrough();
  });

  afterEach(async () => {
    await service.clearCollection(TEST_COLLECTION);
  });

  describe('Initialization', () => {
    it('should initialize database successfully', async () => {
      await service.waitForInitialization();
      expect(initSpy).toHaveBeenCalled();
      expect((service as any).initialized).toBeTrue();
    });

    it('should handle initialization errors', async () => {
      const errorMessage = 'Test initialization error';
      const errorSpy = spyOn(console, 'error');
      initSpy.and.throwError(errorMessage);

      try {
        await service.waitForInitialization();
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.message).toBe(errorMessage);
        expect(errorSpy).toHaveBeenCalled();
        expect((service as any).initialized).toBeFalse();
      }
    });
  });

  describe('CRUD Operations', () => {
    beforeEach(async () => {
      await service.waitForInitialization();
    });

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
      
      await Promise.all(items.map(item => 
        service.upsertData(TEST_COLLECTION, item)
      ));
      
      const endTime = performance.now();
      console.log(`Bulk insert time: ${endTime - startTime}ms`);

      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(50);
    });
  });

  describe('Data Validation', () => {
    it('should validate required fields', async () => {
      const invalidData = [
        {},
        { name: 'Missing ID' },
        { id: null },
        { id: '' },
      ];

      for (const data of invalidData) {
        await expectAsync(
          service.upsertData(TEST_COLLECTION, data as any)
        ).toBeRejectedWithError(/Invalid data/);
      }
    });
  });
});

// services/portfolio.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { DatabaseService } from './database.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Project, Skill, Experience } from '../models/portfolio.models';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let dbServiceSpy: jasmine.SpyObj<DatabaseService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockInitialData = {
    projects: [{ id: '1', title: 'Test Project' }] as Project[],
    skills: [{ id: '1', name: 'Test Skill' }] as Skill[],
    experiences: [{ id: '1', company: 'Test Company' }] as Experience[]
  };

  beforeEach(() => {
    const dbSpy = jasmine.createSpyObj('DatabaseService', [
      'getData',
      'upsertData',
      'clearCollection'
    ]);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PortfolioService,
        { provide: DatabaseService, useValue: dbSpy },
        { provide: HttpClient, useValue: httpSpy }
      ]
    });

    service = TestBed.inject(PortfolioService);
    dbServiceSpy = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should load initial data from JSON when database is empty', async () => {
    dbServiceSpy.getData.and.returnValue(Promise.resolve([]));
    httpClientSpy.get.and.returnValue(of(mockInitialData));

    await service.loadInitialData();

    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(dbServiceSpy.upsertData).toHaveBeenCalled();
  });

  it('should use cached data when available', async () => {
    dbServiceSpy.getData.and.returnValue(Promise.resolve(mockInitialData.projects));
    
    await service.loadInitialData();

    expect(httpClientSpy.get).not.toHaveBeenCalled();
  });

  it('should handle errors during data loading', async () => {
    const errorMessage = 'Failed to load data';
    dbServiceSpy.getData.and.rejectWith(new Error(errorMessage));

    try {
      await service.loadInitialData();
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});

// components/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dbTestServiceSpy: jasmine.SpyObj<DbTestService>;
  let configServiceSpy: jasmine.SpyObj<ConfigService>;
  let storeSpy: jasmine.SpyObj<PortfolioStore>;
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;

  beforeEach(async () => {
    dbTestServiceSpy = jasmine.createSpyObj('DbTestService', ['testDatabaseOperations']);
    configServiceSpy = jasmine.createSpyObj('ConfigService', [], {
      isProduction: false,
      apiConfig: {},
      features: {},
      i18nConfig: {}
    });
    storeSpy = jasmine.createSpyObj('PortfolioStore', ['featuredProjects']);
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
      providers: [
        { provide: DbTestService, useValue: dbTestServiceSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: PortfolioStore, useValue: storeSpy },
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title and meta description', () => {
    expect(titleSpy.setTitle).toHaveBeenCalledWith(
      'Alessandro Aprile - Frontend Developer'
    );
    expect(metaSpy.updateTag).toHaveBeenCalled();
  });

  it('should show test database button in dev mode', () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('.test-button');
    expect(button).toBeTruthy();
  });

  it('should handle database test success', async () => {
    const testResult = {
      success: true,
      counts: { projects: 2, skills: 3, experiences: 1 }
    };
    dbTestServiceSpy.testDatabaseOperations.and.returnValue(Promise.resolve(testResult));

    await component.testDb();
    fixture.detectChanges();

    const resultElement = fixture.nativeElement.querySelector('.test-result');
    expect(resultElement.textContent).toContain('Success!');
  });
});

// components/project-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';
import { Project } from '../../data-access/models/portfolio.models';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    description: 'Test Description',
    technologies: ['Angular', 'TypeScript'],
    featured: true,
    startDate: new Date('2024-01-01')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display project information', () => {
    const titleElement = fixture.nativeElement.querySelector('.project-title');
    const descriptionElement = fixture.nativeElement.querySelector('.project-description');
    
    expect(titleElement.textContent).toContain('Test Project');
    expect(descriptionElement.textContent).toContain('Test Description');
  });

  it('should emit project ID on click', () => {
    spyOn(component.projectClick, 'emit');
    
    const card = fixture.nativeElement.querySelector('.project-card');
    card.click();
    
    expect(component.projectClick.emit).toHaveBeenCalledWith('1');
  });

  it('should show featured badge when project is featured', () => {
    const card = fixture.nativeElement.querySelector('.project-card');
    expect(card.classList.contains('featured')).toBeTrue();
  });
});

// store/portfolio.store.spec.ts
import { TestBed } from '@angular/core/testing';
import { PortfolioStore } from './portfolio.store';
import { Project, Skill, Experience } from '../models/portfolio.models';

describe('PortfolioStore', () => {
  let store: PortfolioStore;

  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Featured Project',
      description: 'Test',
      technologies: ['Angular'],
      featured: true,
      startDate: new Date()
    },
    {
      id: '2',
      title: 'Regular Project',
      description: 'Test',
      technologies: ['React'],
      featured: false,
      startDate: new Date()
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioStore]
    });
    store = TestBed.inject(PortfolioStore);
  });

  it('should initialize with empty state', () => {
    expect(store.projects()).toEqual([]);
    expect(store.skills()).toEqual([]);
    expect(store.experiences()).toEqual([]);
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeNull();
  });

  it('should update projects', () => {
    store.setProjects(mockProjects);
    expect(store.projects()).toEqual(mockProjects);
  });

  it('should filter featured projects', () => {
    store.setProjects(mockProjects);
    const featured = store.featuredProjects();
    expect(featured.length).toBe(1);
    expect(featured[0].title).toBe('Featured Project');
  });

  it('should filter projects by technology', () => {
    store.setProjects(mockProjects);
    store.setProjectTechnologyFilter('Angular');
    
    const filtered = store.filteredProjects();
    expect(filtered.length).toBe(1);
    expect(filtered[0].technologies).toContain('Angular');
  });

  it('should sort experiences by date', () => {
    const experiences: Experience[] = [
      {
        id: '1',
        company: 'New Company',
        role: 'Developer',
        description: 'Test',
        technologies: [],
        startDate: '2024-01-01',
        location: 'Test',
        type: 'remote'
      },
      {
        id: '2',
        company: 'Old Company',
        role: 'Developer',
        description: 'Test',
        technologies: [],
        startDate: '2023-01-01',
        location: 'Test',
        type: 'remote'
      }
    ];