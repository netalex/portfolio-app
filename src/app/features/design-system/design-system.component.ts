// src/app/features/design-system/design-system.component.ts
import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';


interface ColorToken {
  name: string;
  value: string;
  cssVar: string;
  hex?: string;
  rgb?: string;
}

interface TypographyToken {
  name: string;
  class: string;
  text: string;
  cssClass: string;
  description: string;
}

interface SpacingToken {
  name: string;
  value: string;
  cssVar: string;
  pxValue?: number;
}

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="design-system-container">
      <header class="design-system-header">
        <h1>Design System</h1>
        <p>A collection of reusable components and design tokens</p>

        <nav class="ds-nav">
          <a [routerLink]="[]" [fragment]="'colors'" routerLinkActive="active">Colors</a>
          <a [routerLink]="[]" [fragment]="'typography'" routerLinkActive="active">Typography</a>
          <a [routerLink]="[]" [fragment]="'spacing'" routerLinkActive="active">Spacing</a>
          <a [routerLink]="[]" [fragment]="'components'" routerLinkActive="active">Components</a>
        </nav>
      </header>

      <section id="colors" class="ds-internal-section">
        <h2>Colors</h2>
        <div class="color-grid">
          @for (color of colors; track color.name) {
            <div class="color-card">
              <div class="color-sample" [style.background-color]="color.value"></div>
              <div class="color-info">
                <h3>{{ color.name }}</h3>
                <code>{{ color.cssVar }}</code>
                @if (color.hex) {
                  <p class="color-hex">{{ color.hex }}</p>
                }
              </div>
            </div>
          }
        </div>
        <a (click)="scrollToTop()" class="back-to-top">↑</a>
      </section>

      <section id="typography" class="ds-internal-section">
        <h2>Typography</h2>
        <div class="typography-samples">
          @for (sample of typographySamples; track sample.name) {
            <div class="type-sample">
              <div [class]="sample.class">{{ sample.text }}</div>
              <div class="type-info">
                <code>{{ sample.cssClass }}</code>
                <span>{{ sample.description }}</span>
              </div>
            </div>
          }
        </div>
        <a (click)="scrollToTop()" class="back-to-top">↑</a>
      </section>

      <section id="spacing" class="ds-internal-section">
        <h2>Spacing</h2>
        <div class="spacing-samples">
          @for (space of spacing; track space.name) {
            <div class="spacing-item">
              <div class="spacing-box" [style.width]="space.value"></div>
              <div class="spacing-info">
                <code>{{ space.cssVar }}</code>
                <span>{{ space.value }}</span>
              </div>
            </div>
          }
        </div>
        <a (click)="scrollToTop()" class="back-to-top">↑</a>
      </section>

      <section id="components" class="ds-internal-section">
        <h2>Components</h2>
        <!-- Component demos to be added -->
      </section>
      <a (click)="scrollToTop()" class="back-to-top">↑</a>
    </div>
  `,
  styles: [
    `
      .design-system-container {
        padding: var(--spacing-6);
        max-width: 1200px;
        margin: 0 auto;
      }

      .design-system-header {
        margin-bottom: var(--spacing-8);
        text-align: center;
      }

      .ds-nav {
        display: flex;
        justify-content: center;
        gap: var(--spacing-4);
        margin-top: var(--spacing-8);
        padding-bottom: var(--spacing-4);
        border-bottom: 1px solid var(--neutral-200);

        a {
          color: var(--text);
          text-decoration: none;
          padding: var(--spacing-2) var(--spacing-4);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
          cursor: pointer; // Aggiunto per migliorare UX

          &:hover {
            background: var(--neutral-100);
          }

          &.active {
            color: var(--primary);
            background: rgba(var(--primary-rgb), 0.1);
            font-weight: 500;
          }
        }
      }

      .ds-internal-section {
        scroll-margin-top: 2rem; // Aggiunto per migliorare lo scroll to anchor
        margin-bottom: var(--spacing-16);

        h2 {
          margin-bottom: var(--spacing-8);
          padding-bottom: var(--spacing-4);
          border-bottom: 1px solid var(--neutral-200);
        }
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--spacing-6);
        margin-bottom: var(--spacing-8);
      }

      .color-card {
        background: var(--surface);
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-sm);
      }

      .color-sample {
        height: 120px;
        transition: transform 0.2s ease;
        cursor: pointer;

        &:hover {
          transform: scale(1.02);
        }
      }

      .color-info {
        padding: var(--spacing-4);

        h3 {
          margin: 0 0 var(--spacing-2);
          font-size: var(--font-size-lg);
        }

        code {
          display: block;
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-2);
        }

        .color-hex {
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
        }
      }

      .typography-samples {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-8);
      }

      .type-sample {
        border-bottom: 1px solid var(--neutral-200);
        padding-bottom: var(--spacing-6);

        &:last-child {
          border-bottom: none;
        }
      }

      .type-info {
        display: flex;
        gap: var(--spacing-4);
        margin-top: var(--spacing-2);
        font-size: var(--font-size-sm);
        color: var(--text-secondary);

        code {
          font-family: var(--font-mono);
          background: var(--neutral-100);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
        }
      }

      .heading-1 {
        font-size: var(--font-size-4xl);
        font-weight: 700;
        line-height: 1.2;
      }

      .heading-2 {
        font-size: var(--font-size-3xl);
        font-weight: 600;
        line-height: 1.25;
      }

      .body {
        font-size: var(--font-size-base);
        line-height: 1.5;
      }

      .small {
        font-size: var(--font-size-sm);
        line-height: 1.4;
      }

      .spacing-samples {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
      }

      .spacing-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
      }

      .spacing-box {
        height: 24px;
        background: var(--primary);
        border-radius: var(--radius-sm);
        transition: width 0.3s ease;
      }

      .spacing-info {
        display: flex;
        gap: var(--spacing-4);
        font-size: var(--font-size-sm);

        code {
          font-family: var(--font-mono);
          background: var(--neutral-100);
          padding: var(--spacing-1) var(--spacing-2);
          border-radius: var(--radius-sm);
        }
      }

      .back-to-top {
        display: block;
        text-align: center;
        margin-top: var(--spacing-8);
        padding: var(--spacing-2) var(--spacing-4);
        color: var(--primary);
        text-decoration: none;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;

        &:hover {
          transform: translateY(-2px);
          color: var(--primary-dark);
        }

        &::after {
          content: '';
          display: block;
          width: 40px;
          height: 2px;
          background: var(--primary);
          margin: var(--spacing-2) auto 0;
          transition: width 0.2s ease;
        }

        &:hover::after {
          width: 60px;
        }
      }
    `,
  ],
})
export class DesignSystemComponent implements AfterViewInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    // Gestione dell'ancoraggio iniziale
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  colors: ColorToken[] = [
    {
      name: 'Primary',
      value: 'var(--primary)',
      cssVar: '--primary',
      hex: '#3498db',
      rgb: '52, 152, 219',
    },
    {
      name: 'Secondary',
      value: 'var(--secondary)',
      cssVar: '--secondary',
      hex: '#2c3e50',
      rgb: '44, 62, 80',
    },
    {
      name: 'Surface',
      value: 'var(--surface)',
      cssVar: '--surface',
      hex: '#e4e4e4',
      rgb: '255, 255, 255',
    },
    {
      name: 'Text',
      value: 'var(--text)',
      cssVar: '--text',
      hex: '#2c3e50',
      rgb: '44, 62, 80',
    },
  ];

  typographySamples: TypographyToken[] = [
    {
      name: 'Heading 1',
      class: 'heading-1',
      text: 'The quick brown fox jumps over the lazy dog',
      cssClass: '.heading-1',
      description: 'Main page headings',
    },
    {
      name: 'Heading 2',
      class: 'heading-2',
      text: 'The quick brown fox jumps over the lazy dog',
      cssClass: '.heading-2',
      description: 'Section headings',
    },
    {
      name: 'Body',
      class: 'body-text',
      text: 'The quick brown fox jumps over the lazy dog',
      cssClass: '.body',
      description: 'Regular body text',
    },
    {
      name: 'Small',
      class: 'text-small',
      text: 'The quick brown fox jumps over the lazy dog',
      cssClass: '.small',
      description: 'Small text and captions',
    },
  ];

  spacing: SpacingToken[] = [
    {
      name: 'Extra Small',
      value: '0.5rem',
      cssVar: '--spacing-2',
      pxValue: 8,
    },
    {
      name: 'Small',
      value: '1rem',
      cssVar: '--spacing-4',
      pxValue: 16,
    },
    {
      name: 'Medium',
      value: '1.5rem',
      cssVar: '--spacing-6',
      pxValue: 24,
    },
    {
      name: 'Large',
      value: '2rem',
      cssVar: '--spacing-8',
      pxValue: 32,
    },
  ];
}
