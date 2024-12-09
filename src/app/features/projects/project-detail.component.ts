// features/projects/project-detail.component.ts
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioStore } from '../../data-access/store/portfolio.store';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  template: `
    <article class="project-detail body-section">
      @if (loading()) {
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Caricamento progetto...</p>
        </div>
      } @else if (error()) {
        <div class="error-state">
          <h2>Progetto non trovato</h2>
          <p>{{ error() }}</p>
          <button class="back-button" (click)="navigateBack()">
            Torna ai progetti
          </button>
        </div>
      } @else if (project()) {
        <header class="project-header">
          @if (project()?.featured) {
            <div class="featured-badge">
              Progetto in evidenza
            </div>
          }

          <h1 class="project-title">{{ project()?.title }}</h1>

          <div class="project-meta">
            <div class="project-period">
              <span>{{ formatDate(project()?.duration?.start) }}</span>
              @if (project()?.duration?.end) {
                <span> - {{ formatDate(project()?.duration?.end) }}</span>
              } @else {
                <span> - In corso</span>
              }
            </div>
          </div>
        </header>

        @if (project()?.images?.thumbnail) {
          <div class="project-image-container">
            <img
              [src]="project()?.images?.thumbnail"
              [alt]="project()?.title"
              class="project-image"
            />
          </div>
        }

        <div class="project-content">
          <section class="project-description">
            <h2>Descrizione</h2>
            <p>{{ project()?.fullDescription }}</p>
          </section>

          <section class="project-technologies">
            <h2>Tecnologie Utilizzate</h2>
            <div class="tech-list">
              @for (tech of project()?.technologies; track tech) {
                <span class="tech-badge">{{ tech }}</span>
              }
            </div>
          </section>

          <section class="project-links">
            @if (project()?.links?.demo || project()?.links?.github) {
              <h2>Collegamenti</h2>
              <div class="links-container">
                @if (project()?.links?.demo) {
                  <a
                    [href]="project()?.links?.demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link demo"
                  >
                    Vedi Demo
                  </a>
                }
                @if (project()?.links?.github) {
                  <a
                    [href]="project()?.links?.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="project-link source"
                  >
                    Codice Sorgente
                  </a>
                }
              </div>
            }
          </section>
        </div>

        <footer class="project-footer">
          <button class="back-button" (click)="navigateBack()">
            ← Torna ai progetti
          </button>
        </footer>
      }
    </article>
  `,
  styles: [`
    .project-detail {
      max-width: 1000px;
      margin: 0 auto;
      padding: var(--spacing-6);
    }

    .loading-state,
    .error-state {
      text-align: center;
      padding: var(--spacing-8);
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--surface-variant);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-4);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .project-header {
      margin-bottom: var(--spacing-8);
      text-align: center;
    }

    .featured-badge {
      display: inline-block;
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-4);
    }

    .project-title {
      font-size: var(--font-size-4xl);
      color: var(--foreground);
      margin-bottom: var(--spacing-4);
    }

    .project-meta {
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
    }

    .project-image-container {
      margin-bottom: var(--spacing-8);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .project-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .project-content {
      section {
        margin-bottom: var(--spacing-8);

        h2 {
          font-size: var(--font-size-2xl);
          color: var(--foreground);
          margin-bottom: var(--spacing-4);
        }
      }
    }

    .project-description {
      p {
        color: var(--text);
        line-height: 1.6;
      }
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .tech-badge {
      background: var(--surface-variant);
      color: var(--foreground);
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
    }

    .links-container {
      display: flex;
      gap: var(--spacing-4);
      flex-wrap: wrap;
    }

    .project-link {
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;

      &.demo {
        background: var(--primary);
        color: var(--primary-foreground);

        &:hover {
          background: var(--primary-hover);
        }
      }

      &.source {
        background: var(--surface-variant);
        color: var(--foreground);

        &:hover {
          background: var(--surface-variant-hover);
        }
      }
    }

    .project-footer {
      margin-top: var(--spacing-12);
      text-align: center;
    }

    .back-button {
      padding: var(--spacing-3) var(--spacing-6);
      background: var(--surface-variant);
      color: var(--foreground);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        background: var(--surface-variant-hover);
        transform: translateX(-4px);
      }
    }

    @media (max-width: 640px) {
      .project-detail {
        padding: var(--spacing-4);
      }

      .project-title {
        font-size: var(--font-size-3xl);
      }

      .links-container {
        flex-direction: column;
      }

      .project-link {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(PortfolioStore);

  loading = signal(true);
  error = signal<string | null>(null);

  // Otteniamo il progetto corrente basandoci sull'ID nel URL
  protected readonly project = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('ID progetto non specificato');
      return null;
    }
    return this.store.projects().find(p => p.id === id);
  });

  ngOnInit() {
    // Simuliamo un breve caricamento per mostrare lo stato di loading
    setTimeout(() => {
      this.loading.set(false);
      if (!this.project()) {
        this.error.set('Progetto non trovato');
      }
    }, 500);
  }

  protected formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('it-IT', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }

  protected navigateBack() {
    this.router.navigate(['/projects']);
  }
}
