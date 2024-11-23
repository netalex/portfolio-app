// src/app/features/skills/skills-list.component.ts
import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';

@Component({
  selector: 'app-skills-list',
  standalone: true,
  template: `
    <div class="skills-container">
      @if (loading()) {
        <div class="loading">Loading skills...</div>
      }

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (skills().length) {
        <div class="skills-grid">
          @for (skill of skills(); track skill.id) {
            <div class="skill-card">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div 
                  class="skill-progress" 
                  [style.width.%]="skill.level"
                  [style.background-color]="getLevelColor(skill.level)"
                ></div>
              </div>
              <div class="skill-years">
                Experience: {{ skill.yearsOfExperience }} years
              </div>
              <div class="skill-tags">
                @for (keyword of skill.keywords; track keyword) {
                  <span class="skill-tag">{{ keyword }}</span>
                }
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .skills-container {
      padding: var(--spacing-4);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-4);
    }

    .skill-card {
      padding: var(--spacing-4);
      border-radius: var(--radius-md);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }

    .skill-level {
      height: 8px;
      background: var(--surface-variant);
      border-radius: var(--radius-full);
      margin: var(--spacing-2) 0;
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      transition: width 0.3s ease;
    }

    .skill-years {
      font-size: 0.9em;
      color: var(--text-secondary);
      margin: var(--spacing-2) 0;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      margin-top: var(--spacing-2);
    }

    .skill-tag {
      padding: var(--spacing-1) var(--spacing-2);
      background: var(--surface-variant);
      border-radius: var(--radius-sm);
      font-size: 0.8em;
    }
  `]
})
export class SkillsListComponent {
  private store = inject(PortfolioStore);

  skills = this.store.skills;
  loading = this.store.loading;
  error = this.store.error;

  getLevelColor(level: number): string {
    if (level >= 80) return 'var(--color-success)';
    if (level >= 60) return 'var(--color-warning)';
    return 'var(--color-info)';
  }
}