// src/app/features/home/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
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
      imports: [HomeComponent],
      providers: [
        provideRouter(routes),
        { provide: DbTestService, useValue: dbTestServiceSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: PortfolioStore, useValue: storeSpy },
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show test database button in dev mode', () => {
    const button = fixture.nativeElement.querySelector('.test-button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Test Database');
  });

  it('should handle successful database test', async () => {
    const testResult = {
      success: true,
      counts: {
        projects: 2,
        skills: 3,
        experiences: 1
      }
    };
    dbTestServiceSpy.testDatabaseOperations.and.returnValue(Promise.resolve(testResult));

    await component.testDb();
    fixture.detectChanges();

    const resultElement = fixture.nativeElement.querySelector('.test-result');
    expect(resultElement.textContent).toContain('Success!');
  });

  it('should handle database test failure', async () => {
    const errorResult = {
      success: false,
      error: 'Test error'
    };
    dbTestServiceSpy.testDatabaseOperations.and.returnValue(Promise.resolve(errorResult));

    await component.testDb();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Test error');
  });

  it('should set page title and meta description', () => {
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Alessandro Aprile - Frontend Developer');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.any(String)
    });
  });
});

describe('Development mode tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ConfigService,
          useValue: { isProduction: false }
        },
        {
          provide: DbTestService,
          useValue: { testDatabaseOperations: () => Promise.resolve({ success: true }) }
        }
      ]
    });
  });

  it('should show dev tools in development mode', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const devTools = fixture.debugElement.query(By.css('.dev-tools'));
    expect(devTools).toBeTruthy();
  });

  it('should call testDb when button clicked', async () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;
    const spy = spyOn(component, 'testDb');

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.test-button'));
    button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });
});
