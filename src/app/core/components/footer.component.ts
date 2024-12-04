// src/app/core/components/footer.component.ts
import { Component, computed, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { About } from '../../data-access/models/portfolio.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-container">
          @if (about(); as aboutData) {
          <div class="footer-content">
          <div class="footer-info">
              <p>© {{currentYear}} {{ aboutData.personal.name }}. All rights reserved.</p>
          </div>

          <div class="footer-contact">
              <p>
                <a [href]="emailString()">
                  {{ aboutData.personal.email }}
                </a>
              </p>
              <p>{{ aboutData.personal.location.country }} 
                 ({{ aboutData.personal.location.timezone }})</p>
          </div>

          <div class="footer-social">
            <p>
              <a
                [href]="aboutData.personal.social.github"
                target="_blank"
                rel="noopener noreferrer"
                  class="social-link"
                >
                GitHub
              </a>
            </p>
            <p>
              <a
                [href]="aboutData.personal.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                  class="social-link"
                >
                LinkedIn
              </a>
            </p>
            </div>
          </div>
          } @else {
          <div class="footer-content">
            <div class="footer-info">
              <p>© {{currentYear}} Loading...</p>
            </div>
          </div>
          }
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background: var(--background);
      border-top: 1px solid var(--neutral-200);
      padding: var(--spacing-8) 0;
      margin-top: auto;
    }

    .footer-container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 var(--spacing-4);
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--spacing-4);

      @media (max-width: 640px) {
        flex-direction: column;
        text-align: center;
      }
    }

    .footer-social {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .social-link {
      color: var(--foreground);
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary);
      }
    }

    .footer-contact a {
      color: var(--foreground);
      text-decoration: none;

      &:hover {
        color: var(--primary);
      }
    }
  `]
})
export class FooterComponent {
  private readonly store = inject(PortfolioStore);
  
  // Signal per i dati about
  readonly about = this.store.about;
  
  // Computed signal per l'email string
  readonly emailString = computed(() => {
    const aboutData = this.about();
    if (!aboutData) return '#';
    
    return `mailto:${aboutData.personal.email}?subject=Hello`;
  });

  // Anno corrente per il copyright
  readonly currentYear = new Date().getFullYear();
}