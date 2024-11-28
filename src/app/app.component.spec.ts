// src/app/app.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PortfolioService } from './data-access/services/portfolio.service';
import { PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let portfolioService: jasmine.SpyObj<PortfolioService>;

  // Configurazione per test in ambiente browser
  function configureTestingModule(platformId: string = 'browser') {
    portfolioService = jasmine.createSpyObj('PortfolioService', ['loadInitialData']);
    portfolioService.loadInitialData.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: PortfolioService, useValue: portfolioService },
        { provide: PLATFORM_ID, useValue: platformId }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('Browser Environment', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [
          provideRouter(routes),
          { provide: PortfolioService, useValue: portfolioService },
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    // Verifichiamo che il titolo sia corretto
    expect(component.title).toBe('portfolio-app');
  });

    it('should call loadInitialData on init in browser environment', fakeAsync(() => {
      // Eseguiamo ngOnInit
      component.ngOnInit();
      // Facciamo avanzare i timer asincroni
      tick();
      
    expect(portfolioService.loadInitialData).toHaveBeenCalled();
    }));
  });

  describe('Server Environment', () => {
    beforeEach(async () => {
      await configureTestingModule('server');
    });

    it('should not call loadInitialData on server', fakeAsync(() => {
      component.ngOnInit();
      tick();
      
    expect(portfolioService.loadInitialData).not.toHaveBeenCalled();
    }));
});
});