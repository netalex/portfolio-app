// src/app/features/experience/experience-list.component.ts
import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';

@Component({
  selector: 'app-experience-list',
  standalone: true,
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
  `]
})
export class ExperienceListComponent {
  private store = inject(PortfolioStore);

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