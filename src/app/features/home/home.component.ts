import { Component, inject, OnInit } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
  <div class="home-container">
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

        @if (!config.isProduction) {
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
        <div class="project-card">
          <h4>{{ project.title }}</h4>
          <p>{{ project.description }}</p>
        </div>
      }
    </section>
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
    }

    .hero-btn {
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;

      &.primary {
        background: var(--primary);
        color: white;

        &:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
      }

      &.secondary {
        background: rgba(var(--primary-rgb), 0.1);
        color: var(--primary);

        &:hover {
          background: rgba(var(--primary-rgb), 0.2);
          transform: translateY(-2px);
        }
      }
    }

    .dev-tools {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f5f5f5;
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
      background: white;

      &.success {
        border-left: 4px solid green;
      }

      &:not(.success) {
        border-left: 4px solid red;
      }
    }

    .error {
      color: red;
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
  private readonly dbTest = inject(DbTestService);
  protected readonly config = inject(ConfigService);
  protected isTestingDb = false;
  protected lastTestResult: any = null;

  private readonly store = inject(PortfolioStore);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Alessandro Aprile - Frontend Developer');
    this.meta.updateTag({
      name: 'description',
      content: 'Portfolio of Alessandro Aprile, Frontend Developer specialized in Angular, React, and modern web technologies.'
    });
  }


  async ngOnInit() {
    if (!this.config.isProduction) {
      console.log('Current environment:', {
        api: this.config.apiConfig,
        features: this.config.features,
        i18n: this.config.i18nConfig,
        github: this.config.github
      });
    }
  }

  async testDb() {
    this.isTestingDb = true;
    try {
      this.lastTestResult = await this.dbTest.testDatabaseOperations();
    } catch (error) {
      this.lastTestResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      this.isTestingDb = false;
    }
  }

  featuredProjects = this.store.featuredProjects;
}
