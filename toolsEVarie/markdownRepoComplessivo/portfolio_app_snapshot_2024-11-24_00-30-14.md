# Portfolio App Repository Snapshot

Generated on: 2024-11-24 00:30:14

## Git Status

Current Branch: `main`

### Last 10 Commits (with full messages)

```
5a9aedf
git add toolsEVarie/fromAngularProjectToMarkdown.py git add toolsEVarie/markdownRepoComplessivo/.gitkeep
git commit -m "feat(tools): add project snapshot generator script

SETUP-003: Project Documentation Tools

Main changes:
  * Add Python script for generating project snapshots
  * Create markdownRepoComplessivo output directory
  * Implement file categorization and git info extraction

Technical Notes:
- Python script using pathlib and modern best practices
- Smart file categorization by project structure
- Git integration for repository history and status
- Robust error handling for file processing
- Configurable file and directory exclusion lists

Breaking Changes: None

Documentation: Complete
- Comprehensive docstrings in code
- Usage instructions in script
- Example commands in comments

Migration: N/A"

----------------

613ea55
AA chore(cleanup): organize project structure and remove temporary files
SETUP-002: Code organization and cleanup

- Main changes:
  * Move documentation and tools to dedicated /toolsEvarie directory
  * Remove server.ts backup files
  * Clean up configuration files
  * Remove temporary and unused files
  * Organize support materials and chat documentation

Technical Notes:
- No functional changes
- Better organization of development support materials
- Cleaner project root structure
- Preserved essential documentation and tools in dedicated directory

Breaking Changes: None

Documentation: Support materials reorganized in /toolsEvarie
Migration: N/A

----------------

3a16ad4
AA feat(core): initial project setup with SSR and core components
SETUP-001: Initial project structure and SSR implementation

- Main changes:
  * Create core standalone components (Skills, Experience, Design System)
  * Implement modern signal-based store
  * Configure Angular 19 SSR without root server.ts
  * Setup lazy loading routes architecture
  * Add portfolio store with signals
  * Configure build and deployment structure

Technical Notes:
- Angular 19.0.0
- Modern SSR approach (no root server.ts)
- All components are standalone
- Store using computed signals
- Lazy loading implemented for all feature routes

Breaking Changes: None

Documentation: Initial setup documentation needed
Migration: N/A

----------------

f97c52b
initial commit

----------------

```

### Working Directory Status

```
 M package-lock.json
 M package.json
 M src/app/app.config.ts
 M src/app/data-access/services/portfolio.service.ts
 M src/app/features/experience/experience-list.component.ts
 M src/app/features/home/home.component.ts
 M src/app/features/skills/skills-list.component.ts
 M src/server.ts
 D toolsEVarie/markdownRepoComplessivo/portfolio_app_snapshot_2024-11-23_20-23-56.md
 D toolsEVarie/materialiPerClaude/environment.ts
 M tsconfig.json
?? src/app/core/
?? src/app/data-access/services/database.service.ts
?? src/app/data-access/services/db-test.service.ts
?? src/environments/
?? toolsEVarie/markdownRepoComplessivo/portfolio_app_snapshot_2024-11-23_22-39-29.md
?? toolsEVarie/materialiPerClaude/project-diary.md

```

## Project Files

### Core Configuration

#### angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "portfolio-app": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true,
          "inlineTemplate": true,
          "inlineStyle": true
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/portfolio-app",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "server": "src/main.server.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": [],
            "stylePreprocessorOptions": {
              "includePaths": [
                "src/app/design-system/styles",
                "src",
                "src/styles"
              ]
            },
            "prerender": true,
            "ssr": {
              "entry": "src/server.ts"
            }
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "sourceMap": true,
              "extractLicenses": false,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "portfolio-app:build:production"
            },
            "development": {
              "buildTarget": "portfolio-app:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "serve-ssr": {
          "builder": "@angular-devkit/build-angular:ssr-dev-server",
          "configurations": {
            "development": {
              "target": "portfolio-app:build:development"
            },
            "production": {
              "target": "portfolio-app:build:production"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "buildTarget": "portfolio-app:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": "cf026cc1-6a92-46d3-8eaa-1d6d2387a0f4"
  }
}

```

#### package.json

```json
{
  "name": "portfolio-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "dev:ssr": "ng serve-ssr",
    "serve:ssr": "node dist/portfolio-app/server/main.mjs",
    "build:ssr": "ng build --configuration production",
    "serve:ssr:portfolio-app": "node dist/portfolio-app/server/server.mjs"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^19.0.0",
    "@angular/cdk": "^19.0.0",
    "@angular/common": "^19.0.0",
    "@angular/compiler": "^19.0.0",
    "@angular/core": "^19.0.0",
    "@angular/forms": "^19.0.0",
    "@angular/material": "^19.0.0",
    "@angular/platform-browser": "^19.0.0",
    "@angular/platform-browser-dynamic": "^19.0.0",
    "@angular/platform-server": "^19.0.0",
    "@angular/router": "^19.0.0",
    "@angular/ssr": "^19.0.1",
    "@fontsource/inter": "^5.1.0",
    "chart.js": "^4.4.6",
    "d3": "^7.9.0",
    "express": "^4.18.2",
    "gun": "^0.2020.1240",
    "lokijs": "^1.5.12",
    "mermaid": "^11.4.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.0.1",
    "@angular-eslint/eslint-plugin": "^18.4.1",
    "@angular-eslint/eslint-plugin-template": "^18.4.1",
    "@angular/cli": "^19.0.1",
    "@angular/compiler-cli": "^19.0.0",
    "@cypress/schematic": "^2.5.2",
    "@types/chart.js": "^2.9.41",
    "@types/d3": "^7.4.3",
    "@types/express": "^4.17.17",
    "@types/jasmine": "~5.1.0",
    "@types/lodash": "^4.17.13",
    "@types/lokijs": "^1.5.14",
    "@types/node": "^18.18.0",
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "cypress": "^13.16.0",
    "eslint-config-prettier": "^9.1.0",
    "jasmine-core": "~5.4.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "prettier": "^3.3.3",
    "prettier-plugin-organize-imports": "^4.1.0",
    "typescript": "~5.6.2"
  }
}

```

#### src/app/app.config.ts

```ts
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { DatabaseService } from './data-access/services/database.service';
import { PortfolioService } from './data-access/services/portfolio.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    DatabaseService,
    PortfolioService
  ]
};

```

#### tsconfig.app.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": [
      "node"
    ]
  },
  "files": [
    "src/main.ts",
    "src/main.server.ts",
    "src/server.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}

```

#### tsconfig.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": [
      "es2022",
      "dom"
    ],
    "types": ["node"],
    "baseUrl": "./",
    "paths": {
      "@environments/*": ["src/environments/*"],
      "@app/*": ["src/app/*"],
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

```

#### tsconfig.server.json

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc/server",
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "types": ["node"],
    "lib": ["ES2022", "dom"]
  },
  "files": [
    "src/main.server.ts",
    "src/server.ts"
  ]
}

```

#### tsconfig.spec.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}

```

### Components

#### src/app/app.component.ts

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//TODO: poterebbe essere interessante realizzare header e footer per la navigazione
// import { HeaderComponent } from './core/components/header.component';
// import { FooterComponent } from './core/components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
    <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'portfolio-app';
}

```

#### src/app/features/design-system/design-system.component.ts

```ts
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
```

#### src/app/features/experience/experience-list.component.ts

```ts
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
  private readonly store = inject(PortfolioStore);

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

```

#### src/app/features/home/home.component.ts

```ts
import { Component, inject, OnInit } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
  <div class="home-container">
      <section class="hero">
        <h1>Alessandro Aprile</h1>
        <h2>Frontend Developer</h2>
        @if (!config.isProduction) {
          <div class="dev-tools">
            <button
              (click)="testDb()"
              [disabled]="isTestingDb"
              class="test-button"
            >
              {{ isTestingDb ? 'Testing...' : 'Test Database' }}
            </button>
            @if (lastTestResult) {
              <div class="test-result" [class.success]="lastTestResult.success">
                <h4>Last Test Result:</h4>
                @if (lastTestResult.success) {
                  <p>Success! Items in DB:</p>
                  <ul>
                    <li>Projects: {{ lastTestResult.counts?.projects }}</li>
                    <li>Skills: {{ lastTestResult.counts?.skills }}</li>
                    <li>Experiences: {{ lastTestResult.counts?.experiences }}</li>
                  </ul>
                } @else {
                  <p class="error">Error: {{ lastTestResult.error }}</p>
                }
              </div>
            }
          </div>
        }
      </section>

    <section class="featured-projects">
      <h3>Featured Projects</h3>
      @for (project of featuredProjects(); track project.id) {
        <div class="project-card">
          <h4>{{ project.title }}</h4>
          <p>{{ project.description }}</p>
        </div>
      }
    </section>
  `,
  styles: [`
    .dev-tools {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f5f5f5;
    }

    .test-button {
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .test-result {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
      background: white;

      &.success {
        border-left: 4px solid green;
      }

      &:not(.success) {
        border-left: 4px solid red;
      }
    }

    .error {
      color: red;
    }
    .home-container {
      padding: var(--spacing-4);
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--gradient-primary);
    }

    .featured-projects {
      padding: 2rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly dbTest = inject(DbTestService);
  protected readonly config = inject(ConfigService);
  protected isTestingDb = false;
  protected lastTestResult: any = null;

  private readonly store = inject(PortfolioStore);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Alessandro Aprile - Frontend Developer');
    this.meta.updateTag({
      name: 'description',
      content: 'Portfolio of Alessandro Aprile, Frontend Developer specialized in Angular, React, and modern web technologies.'
    });
  }


  async ngOnInit() {
    if (!this.config.isProduction) {
      console.log('Current environment:', {
        api: this.config.apiConfig,
        features: this.config.features,
        i18n: this.config.i18nConfig,
        github: this.config.github
      });
    }
  }

  async testDb() {
    this.isTestingDb = true;
    try {
      this.lastTestResult = await this.dbTest.testDatabaseOperations();
    } catch (error) {
      this.lastTestResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    } finally {
      this.isTestingDb = false;
    }
  }

  featuredProjects = this.store.featuredProjects;
}

```

#### src/app/features/not-found/not-found.component.ts

```ts
// src/app/features/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a routerLink="/" class="home-link">Go to Homepage</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--spacing-4);
    }

    .not-found-content {
      max-width: 500px;
    }

    h1 {
      font-size: 6rem;
      color: var(--primary);
      margin: 0;
    }

    h2 {
      margin: var(--spacing-4) 0;
    }

    .home-link {
      display: inline-block;
      margin-top: var(--spacing-4);
      padding: var(--spacing-2) var(--spacing-4);
      background-color: var(--primary);
      color: white;
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--primary-dark);
      }
    }
  `]
})
export class NotFoundComponent {}
```

#### src/app/features/projects/projects-list.component.ts

```ts
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

```

#### src/app/features/skills/skills-list.component.ts

```ts
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
  private readonly store = inject(PortfolioStore);

  skills = this.store.skills;
  loading = this.store.loading;
  error = this.store.error;

  getLevelColor(level: number): string {
    if (level >= 80) return 'var(--color-success)';
    if (level >= 60) return 'var(--color-warning)';
    return 'var(--color-info)';
  }
}

```

### Services

#### src/app/core/services/config.service.ts

```ts
// src/app/core/services/config.service.ts
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get isProduction(): boolean {
    return environment.production;
  }

  get apiConfig() {
    return environment.api;
  }

  get cacheConfig() {
    return environment.cache;
  }

  get features() {
    return environment.features;
  }

  get i18nConfig() {
    return environment.i18n;
  }

  get social() {
    return environment.social;
  }

  get github() {
    return {
      apiUrl: environment.githubApiUrl,
      repo: environment.githubRepo,
      owner: environment.githubOwner
    };
  }

  isFeatureEnabled(featureName: keyof typeof environment.features): boolean {
    return environment.features[featureName];
  }
}

```

#### src/app/data-access/services/database.service.ts

```ts
// src/app/data-access/services/database.service.ts
import { Injectable } from '@angular/core';
import Loki, { Collection } from 'lokijs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: Loki;
  private initialized = false;
  private readonly options = {
    autoload: true,
    autoloadCallback: this.databaseInitialize.bind(this),
    autosave: true,
    autosaveInterval: Math.floor(environment.cache.maxAge / 4), // Un quarto del maxAge
  };

  constructor() {
    this.db = new Loki(environment.dbName, this.options);
  }

  private databaseInitialize(): void {
    // Ensure collections exist
    if (!this.db.getCollection('projects')) {
      this.db.addCollection('projects', { indices: ['id'] });
    }
    if (!this.db.getCollection('skills')) {
      this.db.addCollection('skills', { indices: ['id'] });
    }
    if (!this.db.getCollection('experiences')) {
      this.db.addCollection('experiences', { indices: ['id'] });
    }

    this.initialized = true;
  }

  async waitForInitialization(): Promise<void> {
    if (this.initialized) return;
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.initialized) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  getCollection(name: string): Collection<any> {
    return this.db.getCollection(name);
  }

  async upsertData<T extends { id: string }>(
    collectionName: string,
    data: T
  ): Promise<T> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    const existing = collection.findOne({ id: data.id });

    if (existing) {
      Object.assign(existing, data);
      collection.update(existing);
      return existing;
    } else {
      return collection.insert(data);
    }
  }

  async getData<T>(
    collectionName: string,
    query: object = {}
  ): Promise<T[]> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    return collection.find(query);
  }

  async clearCollection(collectionName: string): Promise<void> {
    await this.waitForInitialization();
    const collection = this.getCollection(collectionName);
    collection.clear();
  }
}

```

#### src/app/data-access/services/db-test.service.ts

```ts
// src/app/data-access/services/db-test.service.ts
import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class DbTestService {
  private readonly db = inject(DatabaseService);

  async testDatabaseOperations() {
    console.log('Starting database operations test...');

    try {
      // Test Projects
      const testProjects: Project[] = [
        {
          id: 'portfolio-2024',
          title: 'Portfolio 2024',
          description: 'Modern portfolio application built with Angular 19, featuring SSR, signal-based state management, and a custom design system.',
          technologies: ['Angular', 'TypeScript', 'SCSS', 'SSR', 'LokiJS'],
        featured: true,
          startDate: new Date('2024-01-01')
        },
        {
          id: 'alkemy-2024',
          title: 'ALKEMY - DNA Analysis System',
          description: 'Complex system for DNA analysis management for Italian Ministry of Justice',
          technologies: ['Angular', 'TypeScript', 'PrimeNG', 'Git'],
          featured: true,
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-10-01')
        }
      ];

      // Test Skills
      const testSkills: Skill[] = [
        {
          id: 'angular',
          name: 'Angular',
          category: SkillCategory.FRAMEWORK,
          level: 95,
          yearsOfExperience: 5,
          keywords: ['TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'PrimeNG']
        },
        {
          id: 'react',
          name: 'React',
          category: SkillCategory.FRAMEWORK,
          level: 85,
          yearsOfExperience: 3,
          keywords: ['Redux', 'React Native', 'Hooks', 'Context API']
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: SkillCategory.LANGUAGE,
          level: 90,
          yearsOfExperience: 5,
          keywords: ['ES6+', 'Type System', 'Generics', 'Decorators']
        }
      ];

      // Test Experience
      const testExperiences: Experience[] = [
        {
          id: 'volo-2024',
          company: 'Volo Consulting/Orangee S.r.l',
          role: 'Frontend Developer',
          description: 'Development of DNA analysis management systems for the Italian Ministry of Justice',
          technologies: ['Angular', 'TypeScript', 'PrimeNG', 'Git'],
          startDate: '2024-07-01',
          endDate: '2024-10-01',
          location: 'Remote',
          type: 'remote'
        },
        {
          id: 'thinkopen-2024',
          company: 'THINKOPEN',
          role: 'Frontend Developer',
          description: 'Various frontend development roles including work with ICCREA and GFT',
          technologies: ['Angular', 'React', 'TypeScript', 'Node.js'],
          startDate: '2018-02-01',
          endDate: '2024-07-01',
          location: 'Milan',
          type: 'hybrid'
        }
      ];

      // Test Database Operations
      console.log('Clearing existing data...');
      await Promise.all([
        this.db.clearCollection('projects'),
        this.db.clearCollection('skills'),
        this.db.clearCollection('experiences')
      ]);

      console.log('Inserting test projects...');
      await Promise.all(testProjects.map(p => this.db.upsertData('projects', p)));

      console.log('Inserting test skills...');
      await Promise.all(testSkills.map(s => this.db.upsertData('skills', s)));

      console.log('Inserting test experiences...');
      await Promise.all(testExperiences.map(e => this.db.upsertData('experiences', e)));

      // Verify Data
      console.log('\nVerifying inserted data:');

      const projects = await this.db.getData<Project>('projects');
      console.log('Projects in DB:', projects);

      // Test Skill Operations
      const testSkill: Skill = {
        id: 'skill-1',
        name: 'Angular',
        category: SkillCategory.FRAMEWORK,
        level: 90,
        yearsOfExperience: 5,
        keywords: ['TypeScript', 'RxJS']
      };

      console.log('Inserting test skill...');
      await this.db.upsertData('skills', testSkill);

      console.log('Reading skills...');
      const skills = await this.db.getData<Skill>('skills');
      console.log('Skills in DB:', skills);

      const experiences = await this.db.getData<Experience>('experiences');
      console.log('Experiences in DB:', experiences);

      return {
        success: true,
        counts: {
          projects: projects.length,
          skills: skills.length,
          experiences: experiences.length
        }
      };
    } catch (error) {
      console.error('Database test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

```

#### src/app/data-access/services/portfolio.service.ts

```ts
// src/app/data-access/services/portfolio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly db = inject(DatabaseService);
  private readonly store = inject(PortfolioStore);

  async loadInitialData() {
    try {
      this.store.setLoading(true);

      // Carica dati dal database locale
      const [projects, skills, experiences] = await Promise.all([
        this.db.getData<Project>('projects'),
        this.db.getData<Skill>('skills'),
        this.db.getData<Experience>('experiences')
      ]);

      // Se non ci sono dati nel db, carica i dati iniziali
      if (projects.length === 0) {
        await this.loadInitialDataFromApi();
      } else {
      this.store.setProjects(projects);
      this.store.setSkills(skills);
      this.store.setExperiences(experiences);
      }
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.store.setLoading(false);
    }
  }

  private async loadInitialDataFromApi() {
    // In futuro, questo metodo caricherà i dati da un'API reale
    // Per ora, usiamo dati di esempio
    const projects: Project[] = [
      {
        id: '1',
        title: 'Portfolio App',
        description: 'Personal portfolio website built with Angular',
        technologies: ['Angular', 'TypeScript', 'SCSS'],
        featured: true,
        startDate: new Date('2024-01-01')
      },
      // Altri progetti...
    ];

    const skills: Skill[] = [
      {
        id: '1',
        name: 'Angular',
        category: SkillCategory.FRAMEWORK, // Corretto il tipo
        level: 90,
        yearsOfExperience: 5,
        keywords: ['TypeScript', 'RxJS', 'NgRx']
      },
      // Altre skills...
    ];

    // Salva i dati nel database locale
    await Promise.all([
      ...projects.map(p => this.db.upsertData('projects', p)),
      ...skills.map(s => this.db.upsertData('skills', s))
    ]);

    // Aggiorna lo store
    this.store.setProjects(projects);
    this.store.setSkills(skills);
  }

  async addProject(project: Project) {
    try {
      const savedProject = await this.db.upsertData('projects', project);
      this.store.addProject(savedProject);
    } catch (error) {
      this.store.setError('Failed to add project');
      throw error;
    }
  }

  // Altri metodi per gestire skills ed experiences...
}

```

### State Management

#### src/app/data-access/store/portfolio.store.ts

```ts
// src/app/data-access/store/portfolio.store.ts
import { computed, Injectable, signal } from '@angular/core';
import { Project, Skill, Experience } from '../models/portfolio.models';

interface PortfolioState {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  filters: {
    projectTechnology?: string;
    skillCategory?: string;
  };
}

const initialState: PortfolioState = {
  projects: [],
  skills: [],
  experiences: [],
  loading: false,
  error: null,
  filters: {}
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioStore {
  // State
  private readonly state = signal<PortfolioState>(initialState);

  // Selectors
  readonly projects = computed(() => this.state().projects);
  readonly skills = computed(() => this.state().skills);
  readonly experiences = computed(() => this.state().experiences);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  // Computed selectors
  readonly featuredProjects = computed(() =>
    this.projects().filter(p => p.featured)
  );

  readonly filteredProjects = computed(() => {
    const tech = this.state().filters.projectTechnology?.toLowerCase();
    if (!tech) return this.projects();
    return this.projects().filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(tech))
    );
  });

  readonly sortedExperiences = computed(() =>
    [...this.experiences()].sort((a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  );

  // Actions
  setLoading(loading: boolean) {
    this.state.update(state => ({ ...state, loading }));
  }

  setError(error: string | null) {
    this.state.update(state => ({ ...state, error }));
  }

  setProjects(projects: Project[]) {
    this.state.update(state => ({ ...state, projects }));
  }

  addProject(project: Project) {
    this.state.update(state => ({
      ...state,
      projects: [...state.projects, project]
    }));
  }

  setSkills(skills: Skill[]) {
    this.state.update(state => ({ ...state, skills }));
  }

  setExperiences(experiences: Experience[]) {
    this.state.update(state => ({ ...state, experiences }));
  }

  setProjectTechnologyFilter(technology: string | undefined) {
    this.state.update(state => ({
      ...state,
      filters: { ...state.filters, projectTechnology: technology }
    }));
  }

  reset() {
    this.state.set(initialState);
  }
}

```

### Routing

#### src/app/app.routes.ts

```ts
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent),
    title: 'Alessandro Aprile - Frontend Developer'
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects-list.component')
      .then(m => m.ProjectsListComponent),
    title: 'Projects - Alessandro Aprile'
  },
  {
    path: 'skills',
    loadComponent: () => import('./features/skills/skills-list.component')
      .then(m => m.SkillsListComponent),
    title: 'Skills - Alessandro Aprile'
  },
  {
    path: 'experience',
    loadComponent: () => import('./features/experience/experience-list.component')
      .then(m => m.ExperienceListComponent),
    title: 'Experience - Alessandro Aprile'
  },
  {
    path: 'design-system',
    loadComponent: () => import('./features/design-system/design-system.component')
      .then(m => m.DesignSystemComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];

```

### Shared

#### src/app/app-routing.module.ts

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

### Assets

#### src/app/design-system/styles/_variables.scss

```scss
// Colors
$primary-colors: (
  50: #e3f2fd,
  100: #bbdefb,
  200: #90caf9,
  300: #64b5f6,
  400: #42a5f5,
  500: #2196f3,
  600: #1e88e5,
  700: #1976d2,
  800: #1565c0,
  900: #0d47a1
);

$neutral-colors: (
  50: #fafafa,
  100: #f5f5f5,
  200: #eeeeee,
  300: #e0e0e0,
  400: #bdbdbd,
  500: #9e9e9e,
  600: #757575,
  700: #616161,
  800: #424242,
  900: #212121
);

// Typography
$font-family-sans: 'Inter', system-ui, -apple-system, sans-serif;
$font-family-mono: 'Fira Code', monospace;

// Spacing
$spacing: (
  0: 0,
  1: 0.25rem,
  2: 0.5rem,
  3: 0.75rem,
  4: 1rem,
  5: 1.25rem,
  6: 1.5rem,
  8: 2rem,
  10: 2.5rem,
  12: 3rem,
  16: 4rem
);

// Breakpoints
$breakpoints: (
  xs: 320px,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

```

### Testing

#### src/app/app.component.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'portfolio-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('portfolio-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, portfolio-app');
  });
});

```

### Other

#### simple-ssr-server.mjs

```mjs
// simple-ssr-server.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 4000;

// Serve static files
app.use(express.static(join(__dirname, 'dist/portfolio-app/browser')));

// Basic route handler
app.get('*', (req, res) => {
  console.log('Request received:', req.url);
  res.sendFile(join(__dirname, 'dist/portfolio-app/browser/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('Directory:', __dirname);
});
```

#### src/app/app.config.server.ts

```ts
// src/app/app.config.server.ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

```

#### src/app/app.routes.server.ts

```ts
// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Home page - prerenderizzata per ottimizzare la performance iniziale
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'skills',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'experience',
    renderMode: RenderMode.Prerender,
  },
  {
    // La pagina design system dovrebbe essere server-rendered perché potrebbe cambiare più frequentemente
    path: 'design-system',
    renderMode: RenderMode.Server,
  },
  {
    // Fallback per tutte le altre route
    path: '**',
    renderMode: RenderMode.Server,
    status: 404 // Imposta lo status HTTP appropriato per pagine non trovate
  }
];

```

#### src/app/data-access/models/portfolio.models.ts

```ts
// src/app/data-access/models/portfolio.models.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    demoUrl?: string;
    sourceUrl?: string;
    featured: boolean;
    startDate: Date;
    endDate?: Date;
  }

  export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number; // 0-100
    yearsOfExperience: number;
    keywords: string[];
  }

  export enum SkillCategory {
    FRONTEND = 'Frontend',
    FRAMEWORK = 'Framework',
    LANGUAGE = 'Language',
    TOOL = 'Tool',
    SOFT = 'Soft Skill'
  }

  export interface Experience {
    id: string;
    company: string;
    role: string;
    description: string;
    technologies: string[];
    startDate: string;  // ISO date string es '2022-01-15' -> ISO format
    endDate?: string;   // Optional ISO date string
    location: string;
    type: 'remote' | 'onsite' | 'hybrid';
  }

```

#### src/app/design-system/styles/_themes.scss

```scss
@use 'sass:map';
@use './variables' as vars;

:root {
  // Generate CSS variables for colors
  @each $key, $value in vars.$primary-colors {
    --primary-#{$key}: #{$value};
  }

  @each $key, $value in vars.$neutral-colors {
    --neutral-#{$key}: #{$value};
  }

  // Base theme variables
  --background: var(--neutral-50);
  --foreground: var(--neutral-900);
  --primary: var(--primary-500);
  --primary-foreground: white;

  // Typography
  --font-sans: #{vars.$font-family-sans};
  --font-mono: #{vars.$font-family-mono};

  // Spacing
  @each $key, $value in vars.$spacing {
    --spacing-#{$key}: #{$value};
  }
}

.dark-theme {
  --background: var(--neutral-900);
  --foreground: var(--neutral-50);
  --primary: var(--primary-400);
  --primary-foreground: var(--neutral-900);
}

```

#### src/app/design-system/styles/index.scss

```scss
// src/app/design-system/styles/index.scss
@forward './variables';
@forward './themes';

```

#### src/environments/environment.ts

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  githubApiUrl: 'https://api.github.com',
  githubRepo: 'netalex/portfolio-2024',
  githubOwner: 'netalex',
  dbName: 'portfolio.db',
  apiUrl: 'http://localhost:4000/api', // Per uso futuro
  cacheTimeout: 5 * 60 * 1000, // 5 minuti
  api: {
    baseUrl: 'http://localhost:4200/api',
    timeout: 10000,
  },
  cache: {
    maxAge: 3600000, // 1 hour
    maxItems: 100,
  },
  features: {
    enableBlog: true,
    enableComments: true,
    enableAnalytics: false,
    enablePwa: true,
  },
  sentry: {
    dsn: '',
    environment: 'development',
    tracesSampleRate: 1.0,
  },
  i18n: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'it', 'fr'],
  },
  social: {
    github: 'https://github.com/netalex',
    linkedin: 'https://www.linkedin.com/in/alessandro-aprile-0225106/',
    twitter: '',
  }
};

export const environmentProd = {
  production: true,
  githubApiUrl: 'https://api.github.com',
  githubRepo: 'netalex/portfolio-2024',
  githubOwner: 'netalex',
  api: {
    baseUrl: 'https://alessandroaprile.dev/api',
    timeout: 10000,
  },
  cache: {
    maxAge: 3600000,
    maxItems: 100,
  },
  features: {
    enableBlog: true,
    enableComments: true,
    enableAnalytics: true,
    enablePwa: true,
  },
  sentry: {
    dsn: 'YOUR_SENTRY_DSN',
    environment: 'production',
    tracesSampleRate: 0.2,
  },
  i18n: {
    defaultLanguage: 'en',
    availableLanguages: ['en', 'it', 'fr'],
  },
  social: {
    github: 'https://github.com/netalex',
    linkedin: 'https://www.linkedin.com/in/alessandro-aprile-0225106/',
    twitter: '',
  }
};

```

#### src/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PortfolioApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

#### src/main.server.ts

```ts
// src/main.server.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
```

#### src/main.ts

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

```

#### src/server.ts

```ts
// src/server.ts
import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';

// La cartella dist del server
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

// Crea app Express
const app = express();

// Configura il CommonEngine
const commonEngine = new CommonEngine();

// Serve i file statici
app.get('*.*', express.static(browserDistFolder, {
  maxAge: '1y'
}));

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('*', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
// if (isMainModule(import.meta.url)) {
//   const port = process.env['PORT'] || 4000;
//   app.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// Esporta l'app Express
export default app;

```

#### src/styles.scss

```scss
// src/styles.scss
@use '@angular/material' as mat;
@use 'app/design-system/styles' as ds;


// Reset base
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
}

body {
  font-family: var(--font-sans);
  font-size: var(--font-base);
  line-height: 1.5;
  color: var(--foreground);
  background: var(--background);
}

// Utility classes
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4);
}

// Typography
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  line-height: 1.2;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
}

h3 {
  font-size: 1.75rem;
  font-weight: 600;
}

// Layout
.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.gap-4 {
  gap: var(--spacing-4);
}

```

#### test-server.mjs

```mjs
// test-server.ts
import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Server is working!');
});

app.listen(port, () => {
  console.log(`Test server running at http://localhost:${port}`);
});
```

