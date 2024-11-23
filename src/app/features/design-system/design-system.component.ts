// src/app/features/design-system/design-system.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-design-system',
  standalone: true,
  template: `
    <div class="design-system-container">
      <header class="design-system-header">
        <h1>Design System</h1>
        <p>A collection of reusable components and design tokens</p>
      </header>

      <section class="section">
        <h2>Colors</h2>
        <div class="color-grid">
          @for (color of colors; track color.name) {
            <div class="color-card">
              <div class="color-sample" [style.background-color]="color.value"></div>
              <div class="color-info">
                <h3>{{ color.name }}</h3>
                <code>{{ color.value }}</code>
              </div>
            </div>
          }
        </div>
      </section>

      <section class="section">
        <h2>Typography</h2>
        <div class="typography-samples">
          <h1 class="sample">Heading 1</h1>
          <h2 class="sample">Heading 2</h2>
          <h3 class="sample">Heading 3</h3>
          <p class="sample">Body text</p>
          <p class="sample text-sm">Small text</p>
        </div>
      </section>

      <section class="section">
        <h2>Spacing</h2>
        <div class="spacing-samples">
          @for (space of spacings; track space.name) {
            <div class="spacing-item">
              <div class="spacing-box" [style.width]="space.value"></div>
              <div class="spacing-info">
                <code>{{ space.name }}</code>
                <span>{{ space.value }}</span>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .design-system-container {
      padding: var(--spacing-6);
      max-width: 1200px;
      margin: 0 auto;
    }

    .design-system-header {
      margin-bottom: var(--spacing-8);
      text-align: center;
    }

    .section {
      margin-bottom: var(--spacing-8);
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-4);
    }

    .color-card {
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .color-sample {
      height: 100px;
    }

    .color-info {
      padding: var(--spacing-3);
    }

    .typography-samples {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
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
      height: 20px;
      background: var(--primary);
    }
  `]
})
export class DesignSystemComponent {
  colors = [
    { name: 'Primary', value: 'var(--primary)' },
    { name: 'Secondary', value: 'var(--secondary)' },
    { name: 'Surface', value: 'var(--surface)' },
    { name: 'Text', value: 'var(--text)' }
  ];

  spacings = [
    { name: '--spacing-2', value: '0.5rem' },
    { name: '--spacing-4', value: '1rem' },
    { name: '--spacing-6', value: '1.5rem' },
    { name: '--spacing-8', value: '2rem' }
  ];
}