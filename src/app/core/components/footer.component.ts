// src/app/core/components/footer.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-info">
            <p>© 2024 Alessandro Aprile. All rights reserved.</p>
          </div>

          <div class="footer-social">
            <a
              href="https://github.com/netalex"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alessandro-aprile-0225106/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link">
              LinkedIn
            </a>
          </div>
        </div>
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

      @media (max-width: 640px) {
        flex-direction: column;
        gap: var(--spacing-4);
        text-align: center;
      }
    }

    .footer-social {
      display: flex;
      gap: var(--spacing-4);
    }

    .social-link {
      color: var(--foreground);
      text-decoration: none;

      &:hover {
        color: var(--primary);
      }
    }
  `]
})
export class FooterComponent {}