import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';
import { ProjectCardComponent } from '../projects/project-card.component';

/**
 * Interface representing the result of a database test.
 */
interface TestResult {
  success: boolean;
  counts?: {
    projects: number;
    skills: number;
    experiences: number;
  };
  error?: string;
}

/**
 * The HomeComponent class is responsible for rendering the home page of the application.
 * It includes a hero section with a name, role, tagline, and action buttons, as well as a section for featured projects.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCardComponent],
  template: `
  <div class="home-container body-section">
      <section class="hero">
      <div class="hero-content">
        <h1 class="name">Alessandro Aprile</h1>
        <h2 class="role">Frontend Developer</h2>
        <p class="tagline">Specializzato in Angular, React e architetture frontend moderne</p>

        <div class="hero-actions">
          <a routerLink="/projects" class="hero-btn primary">
            Vedi Progetti
          </a>
          <a routerLink="/experience" class="hero-btn secondary">
            Esperienza
          </a>
        </div>
      </div>
      <p>config.isProduction è {{config.isProduction}}<p>
        @if (config.features.enableDevTools && !config.isProduction) {
          <div class="dev-tools">
            <button
              (click)="testDb()"
              [disabled]="isTestingDb"
              class="test-button"
            >
              {{ isTestingDb ? 'Testing...' : 'Test Database' }}
            </button>
            @if (lastTestResult) {
              <div class="test-result" [class.success]="lastTestResult.success">
                <h4>Last Test Result:</h4>
                @if (lastTestResult.success) {
                  <p>Success! Items in DB:</p>
                  <ul>
                    <li>Projects: {{ lastTestResult.counts?.projects }}</li>
                    <li>Skills: {{ lastTestResult.counts?.skills }}</li>
                    <li>Experiences: {{ lastTestResult.counts?.experiences }}</li>
                  </ul>
                } @else {
                  <p class="error">Error: {{ lastTestResult.error }}</p>
                }
              </div>
            }
          </div>
        }
      </section>

    <section class="featured-projects">
      <h3>Featured Projects</h3>
      @for (project of featuredProjects(); track project.id) {
        <app-project-card [project]="project" />
      }
    </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(
        135deg,
        var(--background) 0%,
        rgba(var(--primary-rgb), 0.1) 100%
      );
      padding: var(--spacing-16) var(--spacing-4);
      text-align: center;
      margin-bottom: var(--spacing-16);
      position: relative;
      z-index: 1;

      a {
        pointer-events: all;
      }

    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .name {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-4);
      background: linear-gradient(
        45deg,
        var(--primary) 0%,
        var(--primary-light) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .role {
      font-size: 2rem;
      color: var(--foreground);
      margin-bottom: var(--spacing-6);
    }

    .tagline {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-8);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: var(--spacing-4);
      justify-content: center;
      position: relative;
      z-index: 2;  // Assicuriamoci che sia sopra eventuali altri elementi
    }

    .hero-btn {
      display: inline-block;
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
      position: relative;
      z-index: 2;
      pointer-events: all;  // Forza la clickability
      cursor: pointer;      // Rende esplicito che è cliccabile

      &.primary {
        background: var(--primary);
        color: white;
        border: 2px solid var(--primary);

        &:hover {
          background: white;
          color: var(--primary);  // Testo diventa blu
          transform: translateY(-2px);
        }
      }

      &.secondary {
        background: white;
        color: var(--primary);
        border: 2px solid var(--primary);

        &:hover {
          background: var(--primary);
          color: white;  // Testo diventa bianco
          transform: translateY(-2px);
        }
      }
    }

    .dev-tools {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);
    }

    .test-button {
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .test-result {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);

      &.success {
        border-left: 4px solid var(--color-success);
      }

      &:not(.success) {
        border-left: 4px solid var(--color-error);
      }

      h4 {
        color: var(--text);      // Assicurati che i titoli abbiano il colore corretto
        margin-bottom: 0.5rem;
      }

      ul {
        list-style: none;
        padding-left: 1rem;
        color: var(--text);      // Assicurati che le liste abbiano il colore corretto
      }
    }

    .error {
      color: var(--color-error);
    }
    .home-container {
      padding: var(--spacing-4);
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--gradient-primary);
    }

    .featured-projects {
      padding: 2rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  /**
   * Service for testing database operations.
   */
  private readonly dbTest = inject(DbTestService);

  /**
   * Service for configuration settings.
   */
  protected readonly config = inject(ConfigService);

  /**
   * Flag indicating if a database test is in progress.
   */
  protected isTestingDb = false;

  /**
   * Result of the last database test.
   */
  protected lastTestResult: TestResult | undefined = undefined;

  /**
   * Store for portfolio data.
   */
  private readonly store = inject(PortfolioStore);

  /**
   * Service for setting meta tags.
   */
  private readonly meta = inject(Meta);

  /**
   * Service for setting the document title.
   */
  private readonly title = inject(Title);

  /**
   * Method to get featured projects from the store.
   */
  featuredProjects = this.store.featuredProjects;

  /**
   * Constructor to set the document title and meta description.
   */
  constructor() {
    this.title.setTitle('Alessandro Aprile - Frontend Developer');
    this.meta.updateTag({
      name: 'description',
      content: 'Portfolio of Alessandro Aprile, Frontend Developer specialized in Angular, React, and modern web technologies.'
    });
  }

  /**
   * Lifecycle hook that runs on initialization.
   * Logs the current environment configuration and the store state if the environment is not production.
   */
  async ngOnInit() {
    if (!this.config.isProduction) {
      console.log("is development")
    }
    console.log('Current environment:', {
      api: this.config.apiConfig,
      features: this.config.features,
      i18n: this.config.i18nConfig,
      github: this.config.github
    });
    console.log("pippo current store ~ file: home.component.ts:316 ~ HomeComponent ~ ngOnInit ~ this.store:", this.store)
  }


  async testDb() {
    if (this.config.isProduction) {
      console.warn('Database testing is not available in production mode');
      return;
    }

    this.isTestingDb = true;
    try {
      this.lastTestResult = await this.dbTest.testDatabaseOperations();
    } catch (error) {
      this.lastTestResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

        console.log("pippo  ~ file: home.component.ts:332 ~ HomeComponent ~ testDb ~ error:", error)

    } finally {
      this.isTestingDb = false;
      console.log("pippo ~ HomeComponent ~ testDb ~ this.isTestingDb:", this.isTestingDb)
    }
  }

}
