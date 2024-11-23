// src/app/features/projects/projects-list.component.ts
import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  // imports: [NgFor, NgIf],<- Non è necessario importare le direttive di Angular
  template: `
    <div class="projects-container">
      @if (loading()) {
        <div class="loading">Loading projects...</div>
      }

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (projects().length) {
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <div class="project-card">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="technologies">
            @for (tech of project.technologies; track tech) {
              <span class="tech-tag">{{ tech }}</span>
            }
          </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .projects-container {
      padding: var(--spacing-4);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--spacing-4);
    }

    .project-card {
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }
  `]
})
export class ProjectsListComponent {
  private store = inject(PortfolioStore);

  // Signals automaticamente reattivi
  projects = this.store.projects;
  loading = this.store.loading;
  error = this.store.error;
}
