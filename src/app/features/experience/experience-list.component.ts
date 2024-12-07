// src/app/features/experience/experience-list.component.ts
import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { PortfolioService } from '../../data-access/services/portfolio.service';
import { ProjectCardComponent } from '../projects/project-card.component';



@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
  <div class="experience-container">
  @if (loading()) {
    <div class="loading">Loading experiences...</div>
  }

  @if (error()) {
    <div class="error">{{ error() }}</div>
  }

  @if (experiences().length) {
    <div class="experience-timeline">
      @for (experience of experiences(); track experience.id) {
        <div class="experience-card">
          <div class="experience-period">
            {{ formatDate(experience.startDate) }} -
            {{ experience.endDate ? formatDate(experience.endDate) : 'Present' }}
          </div>
          <div class="experience-content">
            <h3>{{ experience.company }}</h3>
            <h4>{{ experience.role }}</h4>
            <p>{{ experience.description }}</p>
            <div class="experience-technologies">
              @for (tech of experience.technologies; track tech) {
                <span class="tech-badge">{{ tech }}</span>
              }
            </div>

            <!-- Progetti correlati -->
            @if (portfolioService.getProjectsByExperience(experience.id)().length) {
              <div class="related-projects">
                <h5>Projects</h5>
                <div class="projects-grid">
                  @for (project of portfolioService.getProjectsByExperience(experience.id)();
                        track project.id) {
                    <app-project-card
                      [project]="project"
                      class="nested-project"
                    />
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  }
</div>
  `,
  styles: [`
    .experience-container {
      padding: var(--spacing-4);
      max-width: 800px;
      margin: 0 auto;
    }

    .experience-timeline {
      position: relative;
      padding-left: var(--spacing-8);
    }

    .experience-timeline::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--primary);
    }

    .experience-card {
      position: relative;
      margin-bottom: var(--spacing-6);
      padding-left: var(--spacing-4);
    }

    .experience-card::before {
      content: '';
      position: absolute;
      left: -6px;
      top: 0;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--primary);
    }

    .experience-period {
      font-size: 0.9em;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-2);
    }

    .experience-content {
      background: var(--surface);
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .experience-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      margin-top: var(--spacing-3);
    }

    .tech-badge {
      padding: var(--spacing-1) var(--spacing-2);
      background: var(--surface-variant);
      border-radius: var(--radius-sm);
      font-size: 0.8em;
    }

    /* Stili per i progetti correlati */
    .related-projects {
      margin-top: var(--spacing-3);
      padding-top: var(--spacing-2);
      border-top: 1px solid var(--surface-variant);
    }

    .related-projects h5 {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-2);
    }

    .projects-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
  }

    .nested-project {
      transform: scale(0.95);
      transform-origin: top left;
      transition: transform 0.2s ease;
    }

    .nested-project:hover {
      transform: scale(0.98);
    }

    .nested-project {
      margin-left: var(--spacing-4);
      position: relative;
    }
  
    .nested-project::before {
      content: '';
      position: absolute;
      left: -12px; /* Allineato con il padding del contenuto */
      top: 40px; /* Allineato verticalmente con il testo */
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--primary);
      opacity: 0.7;
    }
  `]
})
export class ExperienceListComponent {
  private readonly store = inject(PortfolioStore);
  protected readonly portfolioService = inject(PortfolioService);

  experiences = this.store.sortedExperiences;
  loading = this.store.loading;
  error = this.store.error;

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }
}
