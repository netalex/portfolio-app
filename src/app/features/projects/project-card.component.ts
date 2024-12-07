// src/app/features/projects/project-card.component.ts
import { Component, input } from '@angular/core';
import { Project } from '../../data-access/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <div class="project-line">
      <div class="project-period">
        {{ formatDate(project().duration.start) }} -
        {{ getEndDate() }}
      </div>
      <div class="project-content">
        <h4>{{ project().title }}</h4>
        <p>{{ project().shortDescription }}</p>
      </div>
    </div>
  `,
  styles: [`
    .project-line {
      padding-left: var(--spacing-4);
      margin-top: var(--spacing-3);
    }

    .project-period {
      font-size: 0.85em;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-1);
    }

    .project-content {
      h4 {
        font-size: 0.95em;
        margin: 0 0 var(--spacing-1);
        color: var(--text-primary);
      }

      p {
        font-size: 0.9em;
        color: var(--text-secondary);
        margin: 0;
      }
    }
  `]
})
export class ProjectCardComponent {
  project = input.required<Project>();

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  getEndDate(): string {
    const endDate = this.project().duration.end;
    if (typeof endDate === 'string') {
      return this.formatDate(endDate);
    }
    return 'Present';
  }
}
