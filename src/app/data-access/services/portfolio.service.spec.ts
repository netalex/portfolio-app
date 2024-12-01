// src/app/data-access/services/portfolio.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PortfolioService } from './portfolio.service';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { Project, Skill, Experience } from '../models/portfolio.models';
import { PLATFORM_ID } from '@angular/core';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let httpMock: HttpTestingController;
  let dbService: jasmine.SpyObj<DatabaseService>;
  let store: PortfolioStore;

  const mockInitialData = {
    projects: [
      {
        id: 'portfolio-app-2024',
        title: 'Personal Portfolio Website Application',
        shortDescription: 'Modern portfolio website built with Angular and custom design system',
        fullDescription: 'Advanced portfolio website showcasing frontend development expertise.',
        technologies: ['Angular 19', 'TypeScript 5.5'],
        role: 'Full Stack Developer',
        duration: {
          start: '2024-11-01'
        },
        features: ['Custom design system', 'Signal-based state management'],
        links: {
          github: 'https://github.com/netalex/portfolio-app',
          live: 'https://alessandroaprile.dev'
        },
        images: {
          thumbnail: '/assets/images/projects/portfolio/thumbnail.webp',
          screenshots: [
            '/assets/images/projects/portfolio/dashboard.webp',
            '/assets/images/projects/portfolio/design-system.webp'
          ]
        },
        category: 'WEB_DEVELOPMENT',
        featured: true,
        status: 'IN_PROGRESS'
      }
    ],
    skills: [
      {
        id: 'angular',
        name: 'Angular',
        category: 'FRAMEWORK',
        level: 95,
        yearsOfExperience: 5,
        keywords: ['TypeScript', 'RxJS'],
        featured: true
      }
    ],
    experiences: [
      {
        id: 'volo-2024',
        company: 'Volo Consulting/Orangee S.r.l',
        role: 'Frontend Developer',
        description: 'Development of DNA analysis management systems',
        technologies: ['Angular', 'TypeScript'],
        startDate: '2024-07-01',
        endDate: '2024-10-01',
        location: 'Remote',
        type: 'remote'
      }
    ]
  };

  beforeEach(() => {
    const dbServiceSpy = jasmine.createSpyObj('DatabaseService', [
      'getData',
      'upsertData',
      'waitForInitialization'
    ]);
    dbServiceSpy.waitForInitialization.and.returnValue(Promise.resolve());
    dbServiceSpy.getData.and.returnValue(Promise.resolve([]));
    dbServiceSpy.upsertData.and.returnValue(Promise.resolve({} as any));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PortfolioService,
        PortfolioStore,
        { provide: DatabaseService, useValue: dbServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(PortfolioService);
    httpMock = TestBed.inject(HttpTestingController);
    dbService = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
    store = TestBed.inject(PortfolioStore);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadInitialData', () => {
    it('should load data from database if available', async () => {
      const mockProjects = [mockInitialData.projects[0]];
      dbService.getData.and.returnValue(Promise.resolve(mockProjects));

      await service.loadInitialData();

      expect(dbService.getData).toHaveBeenCalled();
      expect(store.projects().length).toBe(1);
    });

    it('should load initial data from JSON if database is empty', async () => {
      dbService.getData.and.returnValue(Promise.resolve([]));

      const promise = service.loadInitialData();

      const req = httpMock.expectOne('/assets/data/initial-data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockInitialData);

      await promise;

      expect(dbService.upsertData).toHaveBeenCalled();
      expect(store.projects().length).toBe(1);
    });

    it('should handle errors during data loading', async () => {
      dbService.getData.and.rejectWith(new Error('Database error'));

      try {
        await service.loadInitialData();
        fail('Should have thrown an error');
      } catch (error) {
        expect(store.error()).toBeTruthy();
      }
    });
  });

  describe('Project operations', () => {
    const mockProject: Project = mockInitialData.projects[0];

    it('should add new project', async () => {
      dbService.upsertData.and.returnValue(Promise.resolve(mockProject));

      await service.addProject(mockProject);

      expect(dbService.upsertData).toHaveBeenCalledWith('projects', mockProject);
      expect(store.projects()).toContain(mockProject);
    });

    it('should handle errors when adding project', async () => {
      const error = new Error('Database error');
      dbService.upsertData.and.rejectWith(error);

      try {
        await service.addProject(mockProject);
        fail('Should have thrown an error');
      } catch (err) {
        expect(store.error()).toBe('Failed to add project');
      }
    });
  });

  describe('Initial data validation', () => {
    it('should validate all required project fields', async () => {
      const promise = service.loadInitialData();

      const req = httpMock.expectOne('/assets/data/initial-data.json');
      req.flush(mockInitialData);

      await promise;

      const project = store.projects()[0];
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.shortDescription).toBeDefined();
      expect(project.technologies).toBeDefined();
      expect(project.images.thumbnail).toBeDefined();
      expect(project.status).toBeDefined();
    });

    it('should validate all required skill fields', async () => {
      const promise = service.loadInitialData();

      const req = httpMock.expectOne('/assets/data/initial-data.json');
      req.flush(mockInitialData);

      await promise;

      const skill = store.skills()[0];
      expect(skill.id).toBeDefined();
      expect(skill.name).toBeDefined();
      expect(skill.category).toBeDefined();
      expect(skill.level).toBeDefined();
      expect(skill.yearsOfExperience).toBeDefined();
    });

    it('should validate all required experience fields', async () => {
      const promise = service.loadInitialData();

      const req = httpMock.expectOne('/assets/data/initial-data.json');
      req.flush(mockInitialData);

      await promise;

      const experience = store.experiences()[0];
      expect(experience.id).toBeDefined();
      expect(experience.company).toBeDefined();
      expect(experience.role).toBeDefined();
      expect(experience.startDate).toBeDefined();
      expect(experience.location).toBeDefined();
      expect(experience.type).toBeDefined();
    });
  });

  describe('Initial data loading', () => {
  it('should load all fields from initial-data.json', async () => {
    const service = TestBed.inject(PortfolioService);
    await service.loadInitialData();

    const store = TestBed.inject(PortfolioStore);
    const projects = store.projects();
    const skills = store.skills();
    const experiences = store.experiences();

    expect(projects).toHaveSize(3); // Verifico numero corretto
    expect(projects[0]).toHaveProperty('technologies');
    expect(projects[0]).toHaveProperty('images.thumbnail');

    expect(skills[0]).toHaveProperty('level');
    expect(skills[0]).toHaveProperty('keywords');

    expect(experiences[0]).toHaveProperty('company');
    expect(experiences[0]).toHaveProperty('technologies');
  });
});

  describe('SSR support', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          PortfolioService,
          PortfolioStore,
          { provide: DatabaseService, useValue: dbService },
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });

      service = TestBed.inject(PortfolioService);
    });

    it('should not load data on server', async () => {
      await service.loadInitialData();
      expect(dbService.getData).not.toHaveBeenCalled();
      expect(store.loading()).toBeFalse();
    });
  });

  describe('Performance', () => {
    it('should load data efficiently', async () => {
      const start = performance.now();

      const promise = service.loadInitialData();

      const req = httpMock.expectOne('/assets/data/initial-data.json');
      req.flush(mockInitialData);

      await promise;

      const end = performance.now();
      const loadTime = end - start;

      expect(loadTime).toBeLessThan(1000); // Should load in less than 1 second
    });
  });
});
