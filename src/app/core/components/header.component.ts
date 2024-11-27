// src/app/core/components/header.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from './theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <header class="app-header">
      <div class="header-container">
        <a routerLink="/" class="logo">
          Alessandro Aprile
        </a>

        <nav class="main-nav">
          <a
            routerLink="/projects"
            routerLinkActive="active"
            class="nav-link">
            Projects
          </a>
          <a
            routerLink="/skills"
            routerLinkActive="active"
            class="nav-link">
            Skills
          </a>
          <a
            routerLink="/experience"
            routerLinkActive="active"
            class="nav-link">
            Experience
          </a>
          <a
            routerLink="/design-system"
            routerLinkActive="active"
            class="nav-link">
            Design System
          </a>
          <app-theme-toggle />
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      background: var(--background);
      border-bottom: 1px solid var(--neutral-200);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .header-container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: var(--spacing-4);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--foreground);
      text-decoration: none;

      &:hover {
        color: var(--primary);
      }
    }

    .main-nav {
      display: flex;
      gap: var(--spacing-6);
    }

    .nav-link {
      color: var(--foreground);
      text-decoration: none;
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;

      &:hover {
        color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
      }

      &.active {
        color: var(--primary);
    background: rgba(var(--primary-rgb), 0.15);
    font-weight: 500;
      }
    }
  `]
})
export class HeaderComponent {}
