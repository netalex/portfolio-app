# Portfolio App Repository Snapshot

Generated on: 2024-11-30 05:12:12

## Git Status

Current Branch: `main`

### Last 10 Commits (with full messages)

```
12c04bb
AA docs(data): add detailed data documentation REF-DOC-904: Data Architecture Documentation - Main changes:   * Created data models documentation   * Added relationships documentation   * Included constraints documentation   * Added ERD diagram and type definitions
Technical Notes:
- Used Mermaid for ERD visualization
- Included TypeScript interfaces
- Added detailed constraints
- Documented all relationships

Breaking Changes: None
Documentation: Added data architecture docs
Migration: N/A

----------------

06876b0
AA docs(readme): update main documentation README REF-DOC-903: Documentation Structure Update - Main changes:   * Added data models section   * Updated project structure   * Added architecture documentation sections   * Improved navigation and organization Technical Notes: - Organized documentation by category - Added clear navigation structure - Included data model references Breaking Changes: None Documentation: Updated main README Migration: N/A

----------------

1531ab7
AA database.service.spec.ts working but test has errors

----------------

4f8e7ca
AA test(database): incomplete database service test implementation REF-TEST-004: Database Service Testing - Main changes:   * Started implementation of proper error handling tests   * Added initialization error testing   * Improved TypeScript error handling   * Added database error type Technical Notes: - Need to review database initialization in tests - Consider mock implementation for testing Breaking Changes: None Documentation: Testing documentation needs update Migration: N/A

----------------

8eb3199
AA test(components): fix AppComponent test configuration INCOMPLETE WITH ERRORS REF-TEST-003: Component Testing Setup - Main changes:   * Fixed AppComponent test configuration for standalone components   * Added proper environment simulation using PLATFORM_ID   * Improved async testing setup with fakeAsync   * Added separate test suites for browser and server environments   * Added title property test Technical Notes: - Use PLATFORM_ID instead of window manipulation - Properly handle async operations in tests - Improved test organization and readability Breaking Changes: None Documentation: Added detailed test structure comments Migration: N/A

----------------

eba7dc6
AA feat(projects): implement project components and data structure REF-FEAT-236: Project Feature Implementation
- Main changes:
  * Created comprehensive project components structure:
    - ProjectListComponent with filtering and grid layout
    - ProjectDetailComponent with full project information
    - ProjectCardComponent for grid items
    - ProjectFiltersComponent for technology filtering
  * Implemented initial data structure:
    - Created and organized initial-data.json with complete portfolio data
    - Structured data models for projects, skills, and experiences
    - Added TypeScript interfaces for all data types
  * Fixed SSR and data loading issues:
    - Resolved infinite loop in SSR bootstrap
    - Added proper platform checks for browser/server contexts
    - Temporarily disabled prerendering for development
    - Improved error handling in data initialization
  * Organized project structure:
    - Properly placed components according to feature structure
    - Organized static data in assets/data
    - Updated imports and dependencies
  * Added documentation:
    - Created README for static data
    - Updated SSR considerations guide
    - Added component documentation

Technical Notes:
- Improved project structure following Angular best practices
- Added signal-based state management
- Enhanced error handling and loading states
- Implemented responsive design with CSS Grid
- Added proper TypeScript typing
- Started implementing accessibility features
- Prepared structure for i18n support

Documentation:
- Added README.md in assets/data
- Updated project structure documentation
- Added SSR considerations

Migration: N/A

This commit represents a significant milestone in the project development,
establishing the core structure for project display and data management
while resolving critical SSR and initialization issues.

----------------

ee3c504
AA feat(theme): complete theme system implementation REF-FEAT-235: Theme System Completion - Main changes:   * Completed SSR-safe theme system   * Fixed contrast issues in all components   * Implemented correct theme switching behavior   * Finalized dev tools visibility control Technical Notes: - All theme-related functionality working in both SSR and client - Dev tools correctly styled in all themes - Theme system ready for production use Breaking Changes: None Documentation: Theme system documentation complete Migration: N/A

----------------

25363b9
AA docs(project): complete documentation setup and navigation guide REF-DOC-901: Project Documentation Setup
- Main changes:
  * Created /doc folder structure with comprehensive documentation
  * Added detailed fragment navigation documentation with code examples
  * Created root README.md with complete project overview
  * Added CONTRIBUTING.md with detailed guidelines
  * Updated all repository URLs to portfolio-app
  * Implemented consistent documentation structure
  * Added technical notes and examples throughout
  * better log in project snapshot of git log

Technical Notes:
- Created documentation structure in /doc folder
- Used actual code examples from project
- Added explanations of Angular Router features
- Included CSS considerations for navigation
- Established project-wide documentation standards
- Ensured URL consistency across all docs
- Added comprehensive contribution guidelines
- in fromAngularProjectToMark.py set git status to full log eliminating --short option
- added to AI knowledge project-dat.json

Breaking Changes: None
Documentation:
- Added Fragment Navigation Guide
- Created Project Documentation Structure
- Added Root README.md
- Added CONTRIBUTING.md
Migration: N/A

----------------

c8e1383
AA commit intermedio per snapshot

----------------

3787c5c
AA fix(navigation): complete navigation and theme improvements REF-FIX-510: Navigation System Overhaul
- Main changes:
  * Fixed RouterLink integration in HomeComponent
  * Fixed hero button navigation and hover states
    - Inverted button colors on hover
    - Added proper z-index and clickability
    - Improved contrast and visual feedback
  * Enhanced design system navigation
    - Added back to top buttons
    - Improved scroll behavior and positioning
    - Fixed internal anchor navigation
  * Fixed design system theme and colors
    - Added missing color variables in _themes.scss
    - Added RGB and HSL support for opacity
    - Improved color card layout and visibility
    - Enhanced color system organization

Technical Notes:
- Added RouterLink imports where needed
- Implemented proper z-index hierarchy
- Added smooth scroll behavior
- Improved button states and interactions
- Enhanced color system with RGB/HSL support
- Fixed theme variables structure
- Improved overall navigation UX

Breaking Changes: None
Documentation: N/A
Migration: N/A

----------------

```

### Working Directory Status

```
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/app/data-access/models/portfolio.models.ts
	deleted:    src/app/data-access/services/database.service.spec.bak
	deleted:    src/app/data-access/services/database.service.spec.ts.chatGPT
	modified:   src/app/data-access/services/database.service.ts
	modified:   src/assets/data/initial-data.json
	modified:   toolsEVarie/materialiPerClaude/project-diary.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	toolsEVarie/database.service.spec.bak
	toolsEVarie/database.service.spec.ts.chatGPT
	toolsEVarie/markdownRepoComplessivo/portfolio_app_snapshot_2024-11-30_02-54-32.md
	toolsEVarie/markdownRepoComplessivo/portfolio_app_snapshot_2024-11-30_04-39-38.md
	toolsEVarie/unit-tests-artifact_claude.ts

no changes added to commit (use "git add" and/or "git commit -a")

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
            "prerender": false, // Disabilitiamo temporaneamente il prerender
            "ssr": {
              "entry": "src/server.ts"
            },
            "allowedCommonJsDependencies": [
              "lokijs"
            ]
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
        "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/portfolio-app-server",
            "main": "src/main.server.ts",
            "tsConfig": "tsconfig.server.json"
          }
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
        // "prerender": {
        //   "builder": "@angular-devkit/build-angular:prerender",
        //   "options": {
        //     "browserTarget": "portfolio-app:build",
        //     "serverTarget": "portfolio-app:server",
        //     "routes": [
        //       "/",
        //       "/skills",
        //       "/projects"
        //     ]
        //   }
        // },
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
    "start:prod": "ng serve --configuration production",
    "build": "ng build",
    "build:dev": "ng build --configuration development",
    "build:prod": "ng build --configuration production",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "dev:ssr": "ng run portfolio-app:serve-ssr",
    "build:ssr": "ng build --configuration production && ng run portfolio-app:server:production",
    "serve:ssr": "node dist/portfolio-app/server/server.mjs",
    "serve:ssr:dev": "SSR=true node dist/portfolio-app/server/server.mjs",
    "prerender": "ng run portfolio-app:prerender"
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
    "rimraf": "^6.0.1",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^19.0.1",
    "@angular-eslint/eslint-plugin": "^18.4.2",
    "@angular-eslint/eslint-plugin-template": "^18.4.2",
    "@angular/cli": "^19.0.1",
    "@angular/compiler-cli": "^19.0.0",
    "@cypress/schematic": "^2.5.2",
    "@types/chart.js": "^2.9.41",
    "@types/d3": "^7.4.3",
    "@types/express": "^5.0.0",
    "@types/jasmine": "~5.1.0",
    "@types/lodash": "^4.17.13",
    "@types/lokijs": "^1.5.14",
    "@types/node": "^22.9.3",
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "cypress": "^13.16.0",
    "eslint-config-prettier": "^9.1.0",
    "glob": "^11.0.0",
    "jasmine-core": "~5.4.0",
    "karma": "^6.4.4",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "prettier": "^3.3.3",
    "prettier-plugin-organize-imports": "^4.1.0",
    "typescript": "^5.6.3"
  }
}

```

#### src/app/app.config.ts

```ts
import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

import { routes } from './app.routes';
import { DatabaseService } from './data-access/services/database.service';
import { PortfolioService } from './data-access/services/portfolio.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: 'HYDRATION',
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return isPlatformBrowser(platformId) ? provideClientHydration() : [];
      }
    },
    DatabaseService,
    PortfolioService
  ]
};

```

#### src/assets/data/initial-data.json

```json
{
  "projects": [
    {
      "id": "portfolio-app-2024",
      "title": "Personal Portfolio Website Application",
      "shortDescription": "Modern portfolio website built with Angular and custom design system",
      "fullDescription": "Advanced portfolio website showcasing frontend development expertise. Features include a custom design system, signal-based state management, SSR optimization, and multi-language support. Implements modern Angular 19 features including standalone components, new control flow, and signals for reactive state management.",
      "technologies": [
        "Angular 19",
        "TypeScript 5.5",
        "SCSS",
        "Angular CDK",
        "LokiJS",
        "SSR",
        "i18n"
      ],
      "role": "Full Stack Developer",
      "duration": {
        "start": "2024-11-01"
      },
      "features": [
        "Custom design system with theme support",
        "Signal-based state management",
        "Server-side rendering optimization",
        "Multi-language support (EN, IT, FR)",
        "Comprehensive test coverage"
      ],
      "links": {
        "github": "https://github.com/netalex/portfolio-app",
        "live": "https://alessandroaprile.dev"
      },
      "images": {
        "thumbnail": "/assets/images/projects/portfolio/thumbnail.webp",
        "screenshots": [
          "/assets/images/projects/portfolio/dashboard.webp",
          "/assets/images/projects/portfolio/design-system.webp"
        ]
      },
      "category": "WEB_DEVELOPMENT",
      "featured": true,
      "status": "IN_PROGRESS"
    },
    {
      "id": "dna-analysis-alkemy-2024",
      "title": "DNA Analysis Management System",
      "shortDescription": "System for Italian Ministry of Justice's Joint Forces Command",
      "fullDescription": "Worked on three interconnected projects for the Italian Ministry of Justice's Joint Forces Command, focusing on DNA analysis management systems. Implemented critical change requests, conducted thorough bug fixes, developed new features, and ensured seamless deployment across all projects.",
      "technologies": [
        "Angular",
        "TypeScript",
        "PrimeNG",
        "Git",
        "REST API"
      ],
      "role": "Frontend Developer",
      "duration": {
        "start": "2024-07-01",
        "end": "2024-10-01"
      },
      "features": [
        "Critical change requests implementation",
        "Bug fixes and stability improvements",
        "Feature development",
        "Cross-project integration",
        "Performance optimization"
      ],
      "category": "ENTERPRISE",
      "featured": true,
      "status": "COMPLETED"
    },
    {
      "id": "banking-system-iccrea-2024",
      "title": "Banking Contract Management System",
      "shortDescription": "Internal application for mass CSV upload of loans and mortgages contract data",
      "fullDescription": "Developed and maintained an internal application for ICCREA banking institution that enables mass upload and processing of CSV files containing contractual data for mortgages and loans. Enhanced frontend performance and implemented new features under tight deadlines.",
      "technologies": [
        "Angular",
        "TypeScript",
        "Git",
        "CSV Processing",
        "Banking APIs"
      ],
      "role": "Frontend Developer",
      "duration": {
        "start": "2024-02-01",
        "end": "2024-06-01"
      },
      "features": [
        "Mass CSV data processing",
        "Performance optimization",
        "Git hooks integration",
        "Banking compliance features"
      ],
      "category": "ENTERPRISE",
      "featured": false,
      "status": "COMPLETED"
    }
  ],
  "skills": [
    {
      "id": "angular",
      "name": "Angular",
      "category": "FRAMEWORK",
      "level": 95,
      "yearsOfExperience": 5,
      "keywords": [
        "Angular 19",
        "TypeScript",
        "RxJS",
        "NgRx",
        "Angular Material",
        "PrimeNG",
        "Signals",
        "SSR"
      ],
      "featured": true,
      "icon": "angular"
    },
    {
      "id": "react",
      "name": "React",
      "category": "FRAMEWORK",
      "level": 85,
      "yearsOfExperience": 3,
      "keywords": [
        "Redux",
        "React Native",
        "Hooks",
        "Context API",
        "React Router",
        "Next.js"
      ],
      "featured": true,
      "icon": "react"
    },
    {
      "id": "typescript",
      "name": "TypeScript",
      "category": "LANGUAGE",
      "level": 90,
      "yearsOfExperience": 5,
      "keywords": [
        "ES6+",
        "Type System",
        "Generics",
        "Decorators",
        "Module System"
      ],
      "featured": true,
      "icon": "typescript"
    },
    {
      "id": "frontend",
      "name": "Frontend Development",
      "category": "FRONTEND",
      "level": 95,
      "yearsOfExperience": 10,
      "keywords": [
        "HTML5",
        "CSS3",
        "JavaScript",
        "SCSS",
        "Responsive Design",
        "Web Performance",
        "Browser APIs"
      ],
      "featured": true,
      "icon": "typescript"
    }
  ],
  "experiences": [
    {
      "id": "volo-2024",
      "company": "Volo Consulting/Orangee S.r.l",
      "role": "Frontend Developer",
      "description": "Development of DNA analysis management systems for the Italian Ministry of Justice. Implemented critical features and ensured seamless integration across multiple complex applications.",
      "achievements": [
        "Implemented critical change requests",
        "Improved system stability",
        "Developed new features",
        "Ensured cross-project integration"
      ],
      "technologies": [
        "Angular",
        "TypeScript",
        "PrimeNG",
        "Git",
        "REST API"
      ],
      "startDate": "2024-07-01",
      "endDate": "2024-10-01",
      "location": "Italy",
      "type": "REMOTE"
    },
    {
      "id": "thinkopen-2024",
      "company": "THINKOPEN",
      "role": "Frontend Developer",
      "description": "Worked on multiple high-profile projects including ICCREA banking systems and GFT insurance platforms. Led development teams and mentored junior developers.",
      "achievements": [
        "STUB - please claude compile a pertinent list of achievements"
      ],
      "technologies": [
        "Angular",
        "React",
        "TypeScript",
        "Node.js",
        "Git",
        "Banking APIs"
      ],
      "startDate": "2018-02-01",
      "endDate": "2024-07-01",
      "location": "Milan",
      "type": "hybrid"
    },
    {
      "id": "3wlab-2017",
      "company": "3Wlab Milano/Roma",
      "role": "Frontend Developer",
      "description": "Developed an integrated document management system for the public sector and created AI-powered chatbot solutions.",
      "achievements": [
        "STUB - please claude compile a pertinent list of achievements",
      ],
      "technologies": [
        "AngularJS",
        "JavaScript",
        "Node.js",
        "AI/ML",
        "Document Management"
      ],
      "startDate": "2015-01-01",
      "endDate": "2017-12-31",
      "location": "Milan/Rome",
      "type": "hybrid"
    }
  ],
  "about": {
    "personal": {
      "name": "Alessandro Aprile",
      "title": "Frontend Developer",
      "email": "aprile.alessandro@gmail.com",
      "phone": "+393200625543",
      "location": {
        "country": "Italy",
        "timezone": "CET",
        "workLocations": [
          "Remote",
          "Milan",
          "Rome"
        ]
      },
      "social": {
        "github": "https://github.com/netalex",
        "linkedin": "https://www.linkedin.com/in/alessandro-aprile-0225106/"
      }
    },
    "professionalSummary": {
      "shortBio": "Frontend developer specializing in Angular and React, with extensive experience in enterprise applications and public sector projects.",
      "yearsOfExperience": 10,
      "coreTechnologies": [
        "Angular",
        "React",
        "TypeScript"
      ],
      "focus": [
        "Enterprise Applications",
        "Design Systems",
        "Frontend Architecture"
      ],
      "workingPreferences": {
        "preferred": "Remote",
        "available": [
          "Remote",
          "Hybrid"
        ],
        "locations": [
          "Milan",
          "Rome"
        ]
      }
    },
    "languages": [
      {
        "code": "it",
        "name": "Italian",
        "level": "Native"
      },
      {
        "code": "en",
        "name": "English",
        "level": "Fluent"
      },
      {
        "code": "fr",
        "name": "French",
        "level": "Fluent"
      }
    ]
  }
}

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
// src/app/app.component.ts
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header.component';
import { FooterComponent } from './core/components/footer.component';
import { PortfolioService } from './data-access/services/portfolio.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header />
      <main class="main-content">
    <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      margin-top: var(--header-height); // Definiamo questa variabile nel tema
      padding: var(--spacing-4);
      background: var(--background);
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'portfolio-app';
  private readonly portfolioService = inject(PortfolioService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // Only load initial data in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.portfolioService.loadInitialData()
        .catch(error => {
          console.error('Failed to load initial data:', error);
          //TODO: Qui potremmo gestire l'errore in modo più user-friendly
    });
    }
}
}
```

#### src/app/core/components/footer.component.ts

```ts
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
```

#### src/app/core/components/header.component.ts

```ts
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

```

#### src/app/core/components/theme-toggle.component.ts

```ts
// src/app/core/components/theme-toggle.component.ts
import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      class="theme-toggle"
      (click)="themeService.toggleTheme()"
      [attr.aria-label]="'Toggle ' + (themeService.theme() === 'dark' ? 'light' : 'dark') + ' theme'"
    >
      @if (themeService.theme() === 'light') {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      }
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: none;
      border: none;
      padding: var(--spacing-2);
      cursor: pointer;
      color: var(--foreground);
      border-radius: var(--radius-full);
      transition: all 0.2s ease;

      &:hover {
        background: rgba(var(--foreground-rgb), 0.1);
      }

      svg {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
```

#### src/app/features/design-system/design-system.component.ts

```ts
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

      <section id="colors" class="section">
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

      <section id="typography" class="section">
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

      <section id="spacing" class="section">
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

      <section id="components" class="section">
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

      .section {
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
      hex: '#ffffff',
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
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="home-container">
      <section class="hero">
      <div class="hero-content">
        <h1 class="name">Alessandro Aprile</h1>
        <h2 class="role">Frontend Developer</h2>
        <p class="tagline">Specializzato in Angular, React e architetture frontend moderne</p>

        <div class="hero-actions">
          <a routerLink="/projects" class="hero-btn primary">
            Vedi Progetti
          </a>
          <a routerLink="/experience" class="hero-btn secondary">
            Esperienza
          </a>
        </div>
      </div>

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
    .hero {
      background: linear-gradient(
        135deg,
        var(--background) 0%,
        rgba(var(--primary-rgb), 0.1) 100%
      );
      padding: var(--spacing-16) var(--spacing-4);
      text-align: center;
      margin-bottom: var(--spacing-16);
      position: relative;
    z-index: 1;
    
    a {
      pointer-events: all;
    }

    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .name {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: var(--spacing-4);
      background: linear-gradient(
        45deg,
        var(--primary) 0%,
        var(--primary-light) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .role {
      font-size: 2rem;
      color: var(--foreground);
      margin-bottom: var(--spacing-6);
    }

    .tagline {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-8);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: var(--spacing-4);
      justify-content: center;
    position: relative;
    z-index: 2;  // Assicuriamoci che sia sopra eventuali altri elementi
    }

    .hero-btn {
    display: inline-block;
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
    position: relative;
    z-index: 2;
    pointer-events: all;  // Forza la clickability
    cursor: pointer;      // Rende esplicito che è cliccabile

      &.primary {
        background: var(--primary);
        color: white;
      border: 2px solid var(--primary);

        &:hover {
        background: white;
        color: var(--primary);  // Testo diventa blu
          transform: translateY(-2px);
        }
      }

      &.secondary {
      background: white;
        color: var(--primary);
      border: 2px solid var(--primary);

        &:hover {
        background: var(--primary);
        color: white;  // Testo diventa bianco
          transform: translateY(-2px);
        }
      }
    }

    .dev-tools {
      margin-top: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: var(--surface);
      color: var(--text);
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
      background: var(--surface);
      color: var(--text);

      &.success {
        border-left: 4px solid var(--color-success);
      }

      &:not(.success) {
        border-left: 4px solid var(--color-error);
      }

      h4 {
        color: var(--text);      // Assicurati che i titoli abbiano il colore corretto
        margin-bottom: 0.5rem;
      }

      ul {
        list-style: none;
        padding-left: 1rem;
        color: var(--text);      // Assicurati che le liste abbiano il colore corretto
      }
    }

    .error {
      color: var(--color-error);
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

#### src/app/features/projects/components/project-card.component.ts

```ts
// features/projects/project-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../data-access/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <article 
      class="project-card"
      [class.featured]="project.featured"
      (click)="onProjectClick()"
    >
      @if (project.imageUrl) {
        <img 
          [src]="project.imageUrl" 
          [alt]="project.title"
          class="project-image"
          loading="lazy"
        />
      }

      <div class="project-content">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-description">{{ project.description }}</p>

        <div class="project-technologies">
          @for (tech of project.technologies; track tech) {
            <span class="tech-badge">{{ tech }}</span>
          }
        </div>

        <div class="project-links">
          @if (project.demoUrl) {
            <a 
              [href]="project.demoUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="project-link demo"
            >
              Demo
            </a>
          }
          @if (project.sourceUrl) {
            <a 
              [href]="project.sourceUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="project-link source"
            >
              Source
            </a>
          }
        </div>
      </div>
    </article>
  `,
  styles: [`
    .project-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }

      &.featured {
        border: 2px solid var(--primary);
      }
    }

    .project-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .project-content {
      padding: var(--spacing-4);
    }

    .project-title {
      font-size: var(--font-size-xl);
      color: var(--foreground);
      margin-bottom: var(--spacing-2);
    }

    .project-description {
      color: var(--text-secondary);
      margin-bottom: var(--spacing-4);
      line-height: 1.5;
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-4);
    }

    .tech-badge {
      background: var(--surface-variant);
      color: var(--foreground);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
    }

    .project-links {
      display: flex;
      gap: var(--spacing-3);
    }

    .project-link {
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.2s;

      &.demo {
        background: var(--primary);
        color: var(--primary-foreground);

        &:hover {
          background: var(--primary-hover);
        }
      }

      &.source {
        background: var(--surface-variant);
        color: var(--foreground);

        &:hover {
          background: var(--surface-variant-hover);
        }
      }
    }
  `]
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() projectClick = new EventEmitter<string>();

  onProjectClick() {
    this.projectClick.emit(this.project.id);
  }
}
```

#### src/app/features/projects/components/project-filters.component.ts

```ts
// features/projects/project-filters.component.ts
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

export interface ProjectFilters {
  technology?: string;
  // Predisponiamo l'interfaccia per filtri futuri
  status?: 'all' | 'completed' | 'in-progress';
  year?: number;
}

@Component({
  selector: 'app-project-filters',
  standalone: true,
  template: `
    <div class="filters-container">
      <div class="filters-row">
        <div class="filter-group">
          <label for="tech-filter" class="filter-label">Tecnologia</label>
          <div class="filter-chips">
            <button
              class="filter-chip"
              [class.active]="!selectedTechnology()"
              (click)="clearTechnologyFilter()"
            >
              Tutte
            </button>
            @for (tech of technologies; track tech) {
              <button
                class="filter-chip"
                [class.active]="selectedTechnology() === tech"
                (click)="selectTechnology(tech)"
              >
                {{ tech }}
              </button>
            }
          </div>
        </div>

        <div class="active-filters" role="status" aria-live="polite">
          @if (selectedTechnology()) {
            <p class="filter-summary">
              Progetti filtrati per: 
              <span class="filter-value">{{ selectedTechnology() }}</span>
              <button 
                class="clear-filter" 
                (click)="clearTechnologyFilter()"
                aria-label="Rimuovi filtro tecnologia"
              >
                ×
              </button>
            </p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: var(--spacing-4);
      margin-bottom: var(--spacing-6);
    }

    .filters-row {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .filter-label {
      font-weight: 500;
      color: var(--foreground);
      margin-bottom: var(--spacing-2);
    }

    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .filter-chip {
      background: var(--surface-variant);
      border: none;
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-full);
      color: var(--foreground);
      font-size: var(--font-size-sm);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--surface-variant-hover);
      }

      &.active {
        background: var(--primary);
        color: var(--primary-foreground);

        &:hover {
          background: var(--primary-hover);
        }
      }
    }

    .active-filters {
      min-height: var(--spacing-6);
    }

    .filter-summary {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-3);
      background: var(--surface-variant);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      color: var(--foreground);
    }

    .filter-value {
      font-weight: 500;
      color: var(--primary);
    }

    .clear-filter {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
      line-height: 1;
      padding: 0 var(--spacing-1);
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: var(--primary);
      }
    }

    @media (max-width: 640px) {
      .filters-row {
        flex-direction: column;
      }

      .filter-chips {
        max-width: 100%;
        overflow-x: auto;
        padding-bottom: var(--spacing-2);
      }
    }
  `]
})
export class ProjectFiltersComponent {
  @Input() technologies: string[] = [];
  @Output() filterChange = new EventEmitter<ProjectFilters>();

  selectedTechnology = signal<string | undefined>(undefined);

  selectTechnology(tech: string) {
    this.selectedTechnology.set(tech);
    this.emitFilters();
  }

  clearTechnologyFilter() {
    this.selectedTechnology.set(undefined);
    this.emitFilters();
  }

  private emitFilters() {
    const filters: ProjectFilters = {
      technology: this.selectedTechnology()
    };
    this.filterChange.emit(filters);
  }
}
```

#### src/app/features/projects/project-detail.component.ts

```ts
// features/projects/project-detail.component.ts
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
// import { Project } from '../../data-access/models/portfolio.models';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  // imports: [DatePipe],
  template: `
    <article class="project-detail">
      @if (loading()) {
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Caricamento progetto...</p>
        </div>
      } @else if (error()) {
        <div class="error-state">
          <h2>Progetto non trovato</h2>
          <p>{{ error() }}</p>
          <button class="back-button" (click)="navigateBack()">
            Torna ai progetti
          </button>
        </div>
      } @else if (project()) {
        <header class="project-header">
          @if (project()?.featured) {
            <div class="featured-badge">
              Progetto in evidenza
            </div>
          }
          
          <h1 class="project-title">{{ project()?.title }}</h1>
          
          <div class="project-meta">
            <div class="project-period">
              <span>{{ formatDate(project()?.startDate) }}</span>
              @if (project()?.endDate) {
                <span> - {{ formatDate(project()?.endDate) }}</span>
              } @else {
                <span> - In corso</span>
              }
            </div>
          </div>
        </header>

        @if (project()?.imageUrl) {
          <div class="project-image-container">
            <img 
              [src]="project()?.imageUrl" 
              [alt]="project()?.title"
              class="project-image"
            />
          </div>
        }

        <div class="project-content">
          <section class="project-description">
            <h2>Descrizione</h2>
            <p>{{ project()?.description }}</p>
          </section>

          <section class="project-technologies">
            <h2>Tecnologie Utilizzate</h2>
            <div class="tech-list">
              @for (tech of project()?.technologies; track tech) {
                <span class="tech-badge">{{ tech }}</span>
              }
            </div>
          </section>

          <section class="project-links">
            @if (project()?.demoUrl || project()?.sourceUrl) {
              <h2>Collegamenti</h2>
              <div class="links-container">
                @if (project()?.demoUrl) {
                  <a 
                    [href]="project()?.demoUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="project-link demo"
                  >
                    Vedi Demo
                  </a>
                }
                @if (project()?.sourceUrl) {
                  <a 
                    [href]="project()?.sourceUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="project-link source"
                  >
                    Codice Sorgente
                  </a>
                }
              </div>
            }
          </section>
        </div>

        <footer class="project-footer">
          <button class="back-button" (click)="navigateBack()">
            ← Torna ai progetti
          </button>
        </footer>
      }
    </article>
  `,
  styles: [`
    .project-detail {
      max-width: 1000px;
      margin: 0 auto;
      padding: var(--spacing-6);
    }

    .loading-state,
    .error-state {
      text-align: center;
      padding: var(--spacing-8);
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--surface-variant);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-4);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .project-header {
      margin-bottom: var(--spacing-8);
      text-align: center;
    }

    .featured-badge {
      display: inline-block;
      background: var(--primary);
      color: var(--primary-foreground);
      padding: var(--spacing-2) var(--spacing-4);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-4);
    }

    .project-title {
      font-size: var(--font-size-4xl);
      color: var(--foreground);
      margin-bottom: var(--spacing-4);
    }

    .project-meta {
      color: var(--text-secondary);
      font-size: var(--font-size-lg);
    }

    .project-image-container {
      margin-bottom: var(--spacing-8);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    .project-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .project-content {
      section {
        margin-bottom: var(--spacing-8);

        h2 {
          font-size: var(--font-size-2xl);
          color: var(--foreground);
          margin-bottom: var(--spacing-4);
        }
      }
    }

    .project-description {
      p {
        color: var(--text);
        line-height: 1.6;
      }
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }

    .tech-badge {
      background: var(--surface-variant);
      color: var(--foreground);
      padding: var(--spacing-2) var(--spacing-3);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
    }

    .links-container {
      display: flex;
      gap: var(--spacing-4);
      flex-wrap: wrap;
    }

    .project-link {
      padding: var(--spacing-3) var(--spacing-6);
      border-radius: var(--radius-md);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;

      &.demo {
        background: var(--primary);
        color: var(--primary-foreground);

        &:hover {
          background: var(--primary-hover);
        }
      }

      &.source {
        background: var(--surface-variant);
        color: var(--foreground);

        &:hover {
          background: var(--surface-variant-hover);
        }
      }
    }

    .project-footer {
      margin-top: var(--spacing-12);
      text-align: center;
    }

    .back-button {
      padding: var(--spacing-3) var(--spacing-6);
      background: var(--surface-variant);
      color: var(--foreground);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        background: var(--surface-variant-hover);
        transform: translateX(-4px);
      }
    }

    @media (max-width: 640px) {
      .project-detail {
        padding: var(--spacing-4);
      }

      .project-title {
        font-size: var(--font-size-3xl);
      }

      .links-container {
        flex-direction: column;
      }

      .project-link {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(PortfolioStore);

  loading = signal(true);
  error = signal<string | null>(null);
  
  // Otteniamo il progetto corrente basandoci sull'ID nel URL
  protected readonly project = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('ID progetto non specificato');
      return null;
    }
    return this.store.projects().find(p => p.id === id);
  });

  ngOnInit() {
    // Simuliamo un breve caricamento per mostrare lo stato di loading
    setTimeout(() => {
      this.loading.set(false);
      if (!this.project()) {
        this.error.set('Progetto non trovato');
      }
    }, 500);
  }

  protected formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('it-IT', { 
      month: 'long', 
      year: 'numeric' 
    }).format(new Date(date));
  }

  protected navigateBack() {
    this.router.navigate(['/projects']);
  }
}
```

#### src/app/features/projects/projects-list.component.ts

```ts
// src/app/features/projects/projects-list.component.ts
import { Component, computed, inject, signal } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { ProjectCardComponent } from './components/project-card.component';
import { ProjectFilters, ProjectFiltersComponent } from './components/project-filters.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [ProjectCardComponent, ProjectFiltersComponent],
  template: `
    <section class="projects-section">
      <header class="projects-header">
        <h1>I Miei Progetti</h1>
        <p class="projects-subtitle">
          Una selezione dei miei lavori più significativi in ambito frontend
        </p>
        
        <app-project-filters
          [technologies]="availableTechnologies()"
          (filterChange)="handleFilterChange($event)"
        />
      </header>

      @if (loading()) {
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <p>Caricamento progetti...</p>
        </div>
      }

      @if (error()) {
        <div class="error-container" role="alert">
          <p>{{ error() }}</p>
          <button (click)="retryLoading()" class="retry-button">
            Riprova
          </button>
        </div>
      }

      @if (projects().length) {
        <div class="projects-grid">
          @for (project of projects(); track project.id) {
            <app-project-card
              [project]="project"
              (projectClick)="handleProjectClick($event)"
              @fadeSlide
            />
          }
        </div>
      } @else {
        <div class="no-results">
          <p>Nessun progetto trovato con i filtri selezionati</p>
        </div>
      }
    </section>
  `,
  styles: [`
    .projects-section {
      padding: var(--spacing-6);
      max-width: 1200px;
      margin: 0 auto;
    }

    .projects-header {
      text-align: center;
      margin-bottom: var(--spacing-8);

      h1 {
        font-size: var(--font-size-4xl);
        color: var(--foreground);
        margin-bottom: var(--spacing-4);
      }

      .projects-subtitle {
        color: var(--text-secondary);
        font-size: var(--font-size-lg);
        max-width: 600px;
        margin: 0 auto var(--spacing-6);
      }
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-6);
    }

    // .project-card {
    //   padding: var(--spacing-4);
    //   border-radius: var(--radius-md);
    //   background: var(--surface);
    //   box-shadow: var(--shadow-sm);
    // }
    .loading-container, .error-container, .no-results {
      text-align: center;
      padding: var(--spacing-8);
      background: var(--surface);
      border-radius: var(--radius-lg);
      margin: var(--spacing-8) 0;
    }

    .loading-spinner {
      /* Implementare lo spinner con CSS */
      width: 40px;
      height: 40px;
      border: 3px solid var(--surface-variant);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto var(--spacing-4);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .retry-button {
      margin-top: var(--spacing-4);
      padding: var(--spacing-2) var(--spacing-4);
      background: var(--primary);
      color: var(--primary-foreground);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background: var(--primary-hover);
      }
    }
  `],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProjectsListComponent {
  private readonly store = inject(PortfolioStore);

  // Signals dal store
  projects = this.store.filteredProjects;
  loading = this.store.loading;
  error = this.store.error;
  
  // Signal locale per le tecnologie disponibili
  availableTechnologies = computed(() => {
    return [...new Set(
      this.projects().flatMap(p => p.technologies)
    )].sort();
  });

  handleFilterChange(filters: ProjectFilters) {
    this.store.setProjectTechnologyFilter(filters.technology);
  }

  handleProjectClick(projectId: string) {
    // Implementare la navigazione al dettaglio progetto
    console.log('Project clicked:', projectId);
  }

  retryLoading() {
    // Implementare il retry del caricamento
    console.log('Retrying project loading...');
  }
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

#### src/app/core/services/theme.service.ts

```ts
// src/app/core/services/theme.service.ts
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
    // Reagisce ai cambiamenti del tema e aggiorna il DOM
    effect(() => {
      this.updateThemeClass(this.themeSignal());
    });

    // Ascolta i cambiamenti del tema di sistema
    this.watchSystemTheme();
  }
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light'; // Default theme per SSR
    }

  // Modifica l'ordine di priorità: prima controlliamo il matchMedia,
  // poi salviamo la preferenza nel localStorage
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme;
  }

  return prefersDark ? 'dark' : 'light';
}

  private watchSystemTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          // Aggiorna solo se non ci sono preferenze salvate
          this.themeSignal.set(e.matches ? 'dark' : 'light');
        }
      });
  }

  private updateThemeClass(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.themeSignal.update(current => current === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.themeSignal.set(theme);
  }
}
```

#### src/app/data-access/services/database.service.ts

```ts
// src/app/data-access/services/database.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Loki, { Collection } from 'lokijs';
import { environment } from '@environments/environment';
import {
  Project,
  Skill,
  Experience,
  SkillGroup,
  Certification,
  ProjectCategory,
  ProjectStatus,
  SkillCategory
} from '../models/portfolio.models';

type PortfolioEntity = Project | Skill | Experience | SkillGroup | Certification;
type CollectionName = 'projects' | 'skills' | 'experiences' | 'skillGroups' | 'certifications';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly db: Loki | null = null;
  private initialized = false;
  private readonly defaultCollections: CollectionName[] = [
    'projects',
    'skills',
    'experiences',
    'skillGroups',
    'certifications'
  ];

  private readonly options = {
    autoload: true,
    autoloadCallback: this.databaseInitialize.bind(this),
    autosave: true,
    autosaveInterval: Math.floor(environment.cache.maxAge / 4), // Un quarto del maxAge
  };

  constructor() {
    if (typeof window === 'undefined') {
      // if (isPlatformBrowser(this.platformId)) {
      console.warn('LokiJS: Disabling filesystem usage and \nUsing memory adapter for SSR.');
      this.db = new Loki('portfolio.db', {
        adapter: new Loki.LokiMemoryAdapter()
      });
    } else {
      this.db = new Loki(environment.dbName, this.options);
    }
  }

  private databaseInitialize(): void {
    console.log('Database initialized');
    try {
      // Inizializza le collezioni predefinite
      this.defaultCollections.forEach(collectionName => {
        if (!this.db?.getCollection(collectionName)) {
          this.db?.addCollection(collectionName, {
            indices: ['id'],
            unique: ['id']
          });
        }
      });
      this.initialized = true;
      console.log('All collections initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
      this.initialized = false;
    }
  }

  // metodo per creare o ottenere una collezione
  private ensureCollection<T extends PortfolioEntity>(name: CollectionName): Collection<T> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    let collection = this.db.getCollection<T>(name);
    if (!collection) {
      collection = this.db.addCollection<T>(name, {
        indices: ['id'],
        unique: ['id']
      });
    }
    return collection;
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

  async upsertData<T extends PortfolioEntity>(
    collectionName: CollectionName,
    data: T
  ): Promise<T> {
    try {
      await this.waitForInitialization();
      this.validateData(data);

      const convertedData = this.convertEnums(data) as T;
      const collection = this.ensureCollection<T>(collectionName);
      const existing = collection.findOne({ id: data.id }) as T | null;

      if (existing) {
        Object.assign(existing, data);
        collection.update(existing);
        return existing;
      } else {
        return collection.insert(data);
      }
    } catch (error) {
      console.error(`Error upserting data in ${collectionName}:`, error);
      throw error;
    }
  }

  async upsertMany<T extends PortfolioEntity>(
    collectionName: CollectionName,
    items: T[]
  ): Promise<T[]> {
    try {
      await this.waitForInitialization();
      return Promise.all(items.map(item => this.upsertData(collectionName, item)));
    } catch (error) {
      console.error(`Error upserting multiple items in ${collectionName}:`, error);
      throw error;
    }
  }

  async getData<T extends PortfolioEntity>(
    collectionName: CollectionName,
    query: Partial<T> = {}
  ): Promise<T[]> {
    try {
    await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      return collection.find(query);
    } catch (error) {
      console.error(`Error getting data from ${collectionName}:`, error);
      throw error;
    }
  }

  async getById<T extends PortfolioEntity>(
    collectionName: CollectionName,
    id: string
  ): Promise<T | null> {
    try {
    await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      return collection.findOne({ id }) as T | null;
    } catch (error) {
      console.error(`Error getting item by id from ${collectionName}:`, error);
      throw error;
    }
  }

  async deleteData<T extends PortfolioEntity>(
    collectionName: CollectionName,
    id: string
  ): Promise<void> {
    try {
      await this.waitForInitialization();
      const collection = this.ensureCollection<T>(collectionName);
      collection.findAndRemove({ id });
    } catch (error) {
      console.error(`Error deleting data from ${collectionName}:`, error);
      throw error;
    }
  }

  async clearCollection(collectionName: CollectionName): Promise<void> {
    try {
      await this.waitForInitialization();
      const collection = this.ensureCollection(collectionName);
      collection.clear();
    } catch (error) {
      console.error(`Error clearing collection ${collectionName}:`, error);
      throw error;
    }
  }

  private validateData<T extends PortfolioEntity>(data: T): void {
    if (!data) {
      throw new Error('Invalid data: data object is required');
    }

  // Verifica che l'id sia presente
  if (!data.id) {
      throw new Error('Invalid data: id is required');
    }

  // Verifica che l'id sia una stringa
    if (typeof data.id !== 'string') {
      throw new Error('Invalid data: id must be a string');
    }

  // Verifica che l'id non sia vuoto o contenga solo spazi
    if (data.id.trim() === '') {
      throw new Error('Invalid data: id cannot be empty');
    }
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
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { firstValueFrom } from 'rxjs';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly db = inject(DatabaseService);
  private readonly store = inject(PortfolioStore);
  private readonly platformId = inject(PLATFORM_ID);
  private dataInitialized = signal(false);

  async loadInitialData() {
    // Evitiamo di eseguire sul server
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Evitiamo caricamenti multipli
    if (this.dataInitialized()) {
      return;
    }

    try {
      this.store.setLoading(true);

      // Carica dati dal database locale
      const [projects, skills, experiences] = await Promise.all([
        this.db.getData<Project>('projects'),
        this.db.getData<Skill>('skills'),
        this.db.getData<Experience>('experiences')
      ]);

      // Se non ci sono dati nel db, carica i dati iniziali dal file JSON
      if (projects.length === 0) {
        await this.loadInitialDataFromJson();
      } else {
        this.store.setProjects(projects);
        this.store.setSkills(skills);
        this.store.setExperiences(experiences);
      }

      this.dataInitialized.set(true);
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Error loading data');
      throw error; // Rilanciamo l'errore per gestirlo al livello superiore
    } finally {
      this.store.setLoading(false);
    }
  }

  private async loadInitialDataFromJson() {
    try {
      // Carica i dati dal file JSON incluso nell'applicazione
      const response = await firstValueFrom(
      this.http.get<{
        projects: Project[];
        skills: Skill[];
        experiences: Experience[];
      }>('/assets/data/initial-data.json')
    );

      if (!response) throw new Error('No initial data available');

      // Salva i dati nel database locale
      await Promise.all([
        ...response.projects.map(p => this.db.upsertData('projects', p)),
        ...response.skills.map(s => this.db.upsertData('skills', s)),
        ...response.experiences.map(e => this.db.upsertData('experiences', e))
      ]);

      // Aggiorna lo store
      this.store.setProjects(response.projects);
      this.store.setSkills(response.skills);
      this.store.setExperiences(response.experiences);
    } catch (error) {
      console.error('Error loading initial data from JSON:', error);
      throw error;
    }
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
  // In futuro, aggiungeremo anche questa route per i dettagli del progetto
  {
    path: 'projects/:id',
    loadComponent: () => import('./features/projects/project-detail.component')
      .then(m => m.ProjectDetailComponent),
    title: 'Project Details - Alessandro Aprile'
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
      .then(m => m.DesignSystemComponent),
      title: 'Design System - Alessandro Aprile',
      data: { 
        reuse: true // Aggiunto per mantenere lo stato quando si naviga tra i fragment
      }
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
// src/app/app.component.spec.ts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { PortfolioService } from './data-access/services/portfolio.service';
import { PLATFORM_ID } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let portfolioService: jasmine.SpyObj<PortfolioService>;

  // Configurazione per test in ambiente browser
  function configureTestingModule(platformId: string = 'browser') {
    portfolioService = jasmine.createSpyObj('PortfolioService', ['loadInitialData']);
    portfolioService.loadInitialData.and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        { provide: PortfolioService, useValue: portfolioService },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  }

  describe('Browser Environment', () => {
    beforeEach(async () => {
      await configureTestingModule('browser');

      //   await TestBed.configureTestingModule({
      //     imports: [AppComponent],
      //     providers: [
      //       provideRouter(routes),
      //       { provide: PortfolioService, useValue: portfolioService },
      //       { provide: PLATFORM_ID, useValue: 'browser' }
      //     ]
      // }).compileComponents();

      // fixture = TestBed.createComponent(AppComponent);
      // component = fixture.componentInstance;
      // fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have correct title', () => {
      // Verifichiamo che il titolo sia corretto
      expect(component.title).toBe('portfolio-app');
    });

    it('should call loadInitialData on init in browser environment', fakeAsync(() => {
      component.ngOnInit();
      // Facciamo avanzare i timer asincroni
      tick();
      expect(portfolioService.loadInitialData).toHaveBeenCalled();
    }));
  });

  describe('Server Environment', () => {
    beforeEach(async () => {
      await configureTestingModule('server');
    });

    it('should not call loadInitialData on server', fakeAsync(() => {
      component.ngOnInit();
      tick();
      expect(portfolioService.loadInitialData).not.toHaveBeenCalled();
      // Aggiungiamo una verifica esplicita che siamo in ambiente server
      expect(fixture.debugElement.injector.get(PLATFORM_ID)).toBe('server');
    }));
  });
});

```

#### src/app/data-access/services/database.service.spec.ts

```ts
// src/app/data-access/services/database.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';
import { PLATFORM_ID } from '@angular/core';

// Interface for test data
interface TestData {
  id: string;
  name: string;
  category?: string;
  tags?: string[];
  timestamp?: number;
}

// Custom error class for database operations
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

describe('DatabaseService', () => {
  let service: DatabaseService;
  const TEST_COLLECTION = 'test_collection';

  // Helper function per creare dati di test consistenti
  // Permette di aggiungere un suffisso per creare dati unici
  function createTestData(id: string, suffix = ''): TestData {
    return {
      id,
      name: `Test Item ${suffix || id}`,
      category: `Category ${suffix || id}`,
      tags: [`tag1_${suffix || id}`, `tag2_${suffix || id}`],
      timestamp: Date.now(),
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(DatabaseService);
  });

  // Pulizia dopo ogni test per evitare interferenze
  afterEach(async () => {
    await service.clearCollection(TEST_COLLECTION);
  });

  // Suite di test per l'inizializzazione
  describe('Initialization', () => {
    it('should call databaseInitialize during initialization', async () => {
      // Creiamo uno spy sul metodo interno di inizializzazione
      const initSpy = spyOn(service as any, 'databaseInitialize').and.callThrough();
      await service.waitForInitialization();
      expect(initSpy).toHaveBeenCalled();
    });

    it('should set initialized to true after successful initialization', async () => {
      await service.waitForInitialization();
      expect((service as any).initialized).toBeTrue();
    });

    it('should handle initialization errors gracefully', async () => {
      const errorMessage = 'Test initialization error';
      const errorSpy = spyOn(console, 'error');

      // Forziamo un errore durante l'inizializzazione
      const initSpy = spyOn(service as any, 'databaseInitialize')
        .and.throwError(new DatabaseError(errorMessage));

      try {
        await service.waitForInitialization();
        fail('Should have thrown an error');
      } catch (err) {
        expect(err).toBeInstanceOf(DatabaseError);
        if (err instanceof DatabaseError) {
          expect(err.message).toBe(errorMessage);
            expect(errorSpy).toHaveBeenCalledWith(
              'Error initializing database:',
            jasmine.any(DatabaseError)
            );
          expect((service as any).initialized).toBeFalse();
        }
      }
    });

    it('should not reinitialize if already initialized', async () => {
      const initSpy = spyOn(service as any, 'databaseInitialize');
      (service as any).initialized = true;
      
      await service.waitForInitialization();
      expect(initSpy).not.toHaveBeenCalled();
    });
  });

  // Suite di test per le operazioni CRUD base
  describe('CRUD Operations', () => {
    it('should create and read data', async () => {
      const testData = createTestData('1');
      await service.upsertData(TEST_COLLECTION, testData);

      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0]).toEqual(testData);
    });

    it('should update existing data', async () => {
      const originalData = createTestData('1');
      await service.upsertData(TEST_COLLECTION, originalData);

      const updatedData = { ...originalData, name: 'Updated Name' };
      await service.upsertData(TEST_COLLECTION, updatedData);

      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0].name).toBe('Updated Name');
    });

    it('should handle bulk operations efficiently', async () => {
      const items = Array.from({ length: 50 }, (_, i) => createTestData(`${i}`));

      const startTime = performance.now();
      await Promise.all(items.map(item => service.upsertData(TEST_COLLECTION, item)));
      const endTime = performance.now();

      const insertTime = endTime - startTime;
      console.log(`Bulk insert time: ${insertTime}ms`);

      expect(insertTime).toBeLessThan(1000); // Should complete within 1 second

      const result = await service.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(items.length);
    });
  });

  // Suite di test per la validazione dei dati e gestione errori
  describe('Data Validation', () => {
    it('should handle invalid data formats', async () => {
      const invalidData = { name: 'No ID' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, invalidData as any)
      ).toBeRejectedWithError('Invalid data: id is required');
    });

    it('should validate id field', async () => {
      // Test per id null
      const nullIdData = { id: null, name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, nullIdData as any)
      ).toBeRejectedWithError('Invalid data: id is required');

      // Test per id vuoto
      const emptyIdData = { id: '', name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, emptyIdData)
      ).toBeRejectedWithError('Invalid data: id cannot be empty');

      // Test per id con soli spazi
      const whitespaceIdData = { id: '   ', name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, whitespaceIdData)
      ).toBeRejectedWithError('Invalid data: id cannot be empty');

      // Test per tipo non valido
      const numberIdData = { id: 123 as any, name: 'Test' };
      await expectAsync(
        service.upsertData(TEST_COLLECTION, numberIdData as any)
      ).toBeRejectedWithError('Invalid data: id must be a string');
    });
  });

  // Suite di test per le performance
  describe('Query Performance', () => {
    beforeEach(async () => {
      // Setup dati di test
      const items = Array.from({ length: 100 }, (_, i) => ({
        ...createTestData(`${i}`),
        category: i % 2 === 0 ? 'even' : 'odd'
      }));

      await Promise.all(items.map(item => service.upsertData(TEST_COLLECTION, item)));
    });

    it('should efficiently query with filters', async () => {
      const startTime = performance.now();

      const result = await service.getData<TestData>(TEST_COLLECTION, { category: 'even' });

      const queryTime = performance.now() - startTime;
      console.log(`Query time: ${queryTime}ms`);

      expect(queryTime).toBeLessThan(50); // Dovrebbe essere molto veloce
      expect(result).toHaveSize(50);
      expect(result.every(item => item.category === 'even')).toBeTrue();
    });
  });

  // Suite di test per la lettura dei dati
  describe('Read Performance', () => {
    it('should efficiently retrieve data', async () => {
      const ITEMS_COUNT = 50;
      const MAX_ACCEPTABLE_TIME = 500; // ms

      const testItems = Array.from({ length: ITEMS_COUNT }, (_, i) => ({
        id: `test-${i}`,
        name: `Test Item ${i}`
      }));

      // Misuriamo il tempo di inserimento
      const insertStartTime = performance.now();
      await Promise.all(testItems.map(item => service.upsertData(TEST_COLLECTION, item)));
      const insertEndTime = performance.now();
      console.log(`Insert time for ${ITEMS_COUNT} items: ${insertEndTime - insertStartTime}ms`);

      // Test di lettura
      const startTime = performance.now();
      const results = await service.getData(TEST_COLLECTION);
      const endTime = performance.now();
      const readTime = endTime - startTime;

      console.log(`Read time for ${ITEMS_COUNT} items: ${readTime}ms`);

      expect(results.length).toBe(ITEMS_COUNT);
      expect(readTime).toBeLessThan(MAX_ACCEPTABLE_TIME);
    });

    it('should handle filtered queries efficiently', async () => {
      const testItems = [
        { id: '1', name: 'Test 1', category: 'A' },
        { id: '2', name: 'Test 2', category: 'A' },
        { id: '3', name: 'Test 3', category: 'B' },
        { id: '4', name: 'Test 4', category: 'A' },
        { id: '5', name: 'Test 5', category: 'B' }
      ];

      await Promise.all(testItems.map(item => service.upsertData(TEST_COLLECTION, item)));

      const startTime = performance.now();
      const results = await service.getData(TEST_COLLECTION, { category: 'A' });
      const endTime = performance.now();
      const queryTime = endTime - startTime;

      console.log(`Query time for filtered results: ${queryTime}ms`);

      expect(results.length).toBe(3);
      expect(queryTime).toBeLessThan(100);
    });
  });

  // Suite di test per la compatibilità SSR
  describe('SSR Compatibility', () => {
    let ssrService: DatabaseService;

    beforeEach(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          DatabaseService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      ssrService = TestBed.inject(DatabaseService);
    });

    it('should provide mock data in SSR mode', async () => {
      const testData = createTestData('ssr-1');
      await ssrService.upsertData(TEST_COLLECTION, testData);

      const result = await ssrService.getData<TestData>(TEST_COLLECTION);
      expect(result).toHaveSize(1);
      expect(result[0]).toEqual(testData);
    });

    it('should not persist data between SSR requests', async () => {
      // First SSR request
      const testData = createTestData('ssr-1');
      await ssrService.upsertData(TEST_COLLECTION, testData);

      // Simulate a new SSR request by creating a new instance
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          DatabaseService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });

      const newSsrService = TestBed.inject(DatabaseService);
      await newSsrService.waitForInitialization();
      const result = await newSsrService.getData<TestData>(TEST_COLLECTION);

      expect(result).toEqual([]);
    });
  });

  // Suite di test per il caricamento dati iniziali
  describe('Initial Data Loading', () => {
    it('should handle bulk initial data load', async () => {
      const initialData = {
        projects: [
          { id: 'p1', name: 'Project 1' },
          { id: 'p2', name: 'Project 2' }
        ],
        skills: [
          { id: 's1', name: 'Skill 1' },
          { id: 's2', name: 'Skill 2' }
        ]
      };

      await Promise.all([
        ...initialData.projects.map(p => service.upsertData('projects', p)),
        ...initialData.skills.map(s => service.upsertData('skills', s))
      ]);

      const projects = await service.getData('projects');
      const skills = await service.getData('skills');

      expect(projects.length).toBe(2);
      expect(skills.length).toBe(2);
    });
  });
});
```

#### src/app/data-access/services/db-test.service.spec.ts

```ts
// src/app/data-access/services/db-test.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { DbTestService } from './db-test.service';
import { DatabaseService } from './database.service';

describe('DbTestService', () => {
  let service: DbTestService;
  let dbServiceSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DatabaseService', ['clearCollection', 'upsertData', 'getData']);
    TestBed.configureTestingModule({
      providers: [
        DbTestService,
        { provide: DatabaseService, useValue: spy }
      ]
    });
    service = TestBed.inject(DbTestService);
    dbServiceSpy = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle successful database operations', async () => {
    // Setup spy returns
    dbServiceSpy.clearCollection.and.returnValue(Promise.resolve());
    dbServiceSpy.upsertData.and.returnValue(Promise.resolve({} as any));
    dbServiceSpy.getData.and.returnValue(Promise.resolve([{}, {}])); // mock 2 items

    const result = await service.testDatabaseOperations();

    expect(result.success).toBe(true);
    expect(result.counts).toBeDefined();
    expect(result.counts?.projects).toBe(2);
  });

  it('should handle database operation failures', async () => {
    const errorMessage = 'Database error';
    dbServiceSpy.clearCollection.and.rejectWith(new Error(errorMessage));

    const result = await service.testDatabaseOperations();

    expect(result.success).toBe(false);
    expect(result.error).toBe(errorMessage);
  });
});

```

#### src/app/features/home/home.component.spec.ts

```ts
// src/app/features/home/home.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DbTestService } from '../../data-access/services/db-test.service';
import { ConfigService } from '../../core/services/config.service';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dbTestServiceSpy: jasmine.SpyObj<DbTestService>;
  let configServiceSpy: jasmine.SpyObj<ConfigService>;
  let storeSpy: jasmine.SpyObj<PortfolioStore>;
  let titleSpy: jasmine.SpyObj<Title>;
  let metaSpy: jasmine.SpyObj<Meta>;

  beforeEach(async () => {
    dbTestServiceSpy = jasmine.createSpyObj('DbTestService', ['testDatabaseOperations']);
    configServiceSpy = jasmine.createSpyObj('ConfigService', [], {
      isProduction: false,
      apiConfig: {},
      features: {},
      i18nConfig: {}
    });
    storeSpy = jasmine.createSpyObj('PortfolioStore', ['featuredProjects']);
    titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter(routes),
        { provide: DbTestService, useValue: dbTestServiceSpy },
        { provide: ConfigService, useValue: configServiceSpy },
        { provide: PortfolioStore, useValue: storeSpy },
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show test database button in dev mode', () => {
    const button = fixture.nativeElement.querySelector('.test-button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Test Database');
  });

  it('should handle successful database test', async () => {
    const testResult = {
      success: true,
      counts: {
        projects: 2,
        skills: 3,
        experiences: 1
      }
    };
    dbTestServiceSpy.testDatabaseOperations.and.returnValue(Promise.resolve(testResult));

    await component.testDb();
    fixture.detectChanges();

    const resultElement = fixture.nativeElement.querySelector('.test-result');
    expect(resultElement.textContent).toContain('Success!');
  });

  it('should handle database test failure', async () => {
    const errorResult = {
      success: false,
      error: 'Test error'
    };
    dbTestServiceSpy.testDatabaseOperations.and.returnValue(Promise.resolve(errorResult));

    await component.testDb();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Test error');
  });

  it('should set page title and meta description', () => {
    expect(titleSpy.setTitle).toHaveBeenCalledWith('Alessandro Aprile - Frontend Developer');
    expect(metaSpy.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.any(String)
    });
  });
});
```

### Other

#### CONTRIBUTING.md

```md
# Contributing to Portfolio App

First off, thank you for considering contributing to the Portfolio App! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

1. **Use a clear and descriptive title**
2. **Describe the exact steps to reproduce the problem**
3. **Provide specific examples to demonstrate the steps**
4. **Describe the behavior you observed after following the steps**
5. **Explain which behavior you expected to see instead**
6. **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

1. **Use a clear and descriptive title**
2. **Provide a step-by-step description of the suggested enhancement**
3. **Provide specific examples to demonstrate the steps**
4. **Describe the current behavior and explain the behavior you'd like to see**
5. **Explain why this enhancement would be useful**

## Local Development Setup

1. Fork the repository:

   ```bash
   git clone https://github.com/netalex/portfolio-app.git
   ```

2. Install dependencies:

   ```bash
   cd portfolio-app
   npm install
   ```

3. Create a new branch:

   ```bash
   git checkout -b my-feature-branch
   ```

## Development Workflow

1. Make your changes in a new git branch
2. Follow the code style and standards
3. Add or update tests as needed
4. Ensure all tests pass
5. Commit your changes using commitizen format
6. Push your branch and submit a pull request

### Commit Message Format

We follow the Angular commit message format. Each commit message should have a type, scope, and subject:

```bash
<type>(<scope>): <subject>
```

Types:

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

Example:

```plaintext
feat(navigation): add fragment navigation support
```

### Pull Request Process

1. Create your Pull Request (PR)
2. Fill in the PR template
3. Request review from maintainers
4. Update PR based on review comments
5. Wait for approval and merge

#### PR Requirements

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines
- [ ] Branch is up to date with main

## Testing

Run tests before submitting:

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# All tests
npm run test:all
```

## Style Guide

### TypeScript

- Use TypeScript strict mode
- Follow Angular style guide
- Use interfaces for data structures
- Document public APIs

### HTML/CSS

- Use Angular template syntax
- Follow BEM naming convention
- Use SCSS for styling
- Make components responsive

### Documentation

- Update documentation for new features
- Include JSDoc comments
- Update README.md if needed
- Add examples for complex features

## Project Structure

Follow the established project structure when adding new files:

```plaintext
src/
├── app/
│   ├── core/               # Core functionality
│   ├── features/          # Feature modules
│   ├── shared/           # Shared components
│   └── design-system/    # Design system
```

(refer to [documentation README.MD](./doc/README.md#project-structure) for more details)

## Questions?

Feel free to ask for help in:

- GitHub issues
- Pull request comments
- Email: <aprile.alessandro@gmail.com>

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Project documentation
- Release notes

## Additional Notes

- Don't include any credentials in your code
- Keep PRs focused and concise
- Ask questions if you're unsure
- Help review other PRs
- Be patient with the review process

Thank you for contributing!

```

#### doc/architecture/data/models.md

```md
# Portfolio Data Structure

# Data Models

## Overview

This document describes the core data models used in the Portfolio App. These models are designed to represent all the necessary information for a professional portfolio while maintaining clear relationships and constraints.

## Entity Relationship Diagram

```mermaid
erDiagram
    Project ||--o{ Technology : uses
    Project ||--o{ Screenshot : contains
    Project ||--o{ Link : has
    Project {
        string id PK
        string title
        string shortDescription
        string fullDescription
        date startDate
        date endDate
        boolean featured
        enum category
        enum status
    }

    Technology {
        string id PK
        string name
        string category
        int experienceYears
    }

    Skill ||--o{ Certification : has
    Skill ||--o{ SkillGroup : belongsTo
    Skill {
        string id PK
        string name
        enum category
        int level
        int yearsOfExperience
        string description
        array keywords
        boolean featured
        string icon
    }

    Certification {
        string name
        string issuer
        date issueDate
        date validUntil
        string url
    }

    SkillGroup {
        string id PK
        string name
        string description
        array skills
    }

    Experience ||--o{ Project : includes
    Experience ||--o{ Technology : utilizes
    Experience {
        string id PK
        string company
        string role
        date startDate
        date endDate
        string description
        array achievements
        string location
        enum type
        array projects
    }

    Screenshot {
        string id PK
        string url
        string alt
        boolean isThumbnail
    }

    Link {
        string type
        string url
        string title
    }
```

## Core Models

### Project

```typescript
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  role: string;
  duration: {
    start: string;
    end?: string;
  };
  features: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: {
    thumbnail: string;
    screenshots: string[];
  };
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
}
```

### Skill

```typescript
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
  yearsOfExperience: number;
  keywords: string[];
  description?: string;
  certifications?: Certification[];
  featured?: boolean;
  icon?: string;
}
```

### Experience

```typescript
export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  achievements: string[];
  technologies: string[];
  startDate: string;
  endDate?: string;
  location: string;
  type: WorkType;
  projects?: string[];
}
```

## Enums

### ProjectCategory

```typescript
export enum ProjectCategory {
  WEB_DEVELOPMENT = 'Web Development',
  ENTERPRISE = 'Enterprise Software',
  MOBILE = 'Mobile Development',
  DESIGN_SYSTEM = 'Design System'
}
```

### SkillCategory

```typescript
export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  FRAMEWORK = 'Framework',
  LANGUAGE = 'Language',
  DATABASE = 'Database',
  TOOL = 'Tool',
  CLOUD = 'Cloud',
  SOFT = 'Soft Skill',
  METHODOLOGY = 'Methodology'
}
```

### WorkType

```typescript
export enum WorkType {
  REMOTE = 'remote',
  ONSITE = 'onsite',
  HYBRID = 'hybrid'
}
```

```

#### doc/architecture/data/relationships.md

```md
# Data Model Relationships and Constraints

## Overview

This document details the relationships between data models and the constraints that ensure data integrity in the Portfolio App.

## Relationships overview

### Project

- Each project can use multiple technologies
- Each project can have multiple screenshots
- Each project can have multiple links (github, live demo, etc.)
- Projects can be associated with one or more experiences

### Skill

- Skills belong to one or more skill groups
- Skills can have multiple certifications
- Skills are categorized (Frontend, Backend, etc.)
- Skills can be tagged as featured

### Experience

- Experiences can include multiple projects
- Experiences utilize multiple technologies
- Experiences can have achievements
- Experiences are typed (remote, onsite, hybrid)

## Constraints overview

### Projects

- Must have a unique ID
- Must have at least one technology
- Featured projects must have a thumbnail

### Skills

- Level must be between 0 and 100
- Years of experience must be positive
- Featured skills must have an icon

### Experiences

- Start date must be before end date (if end date exists)
- Must have at least one achievement

## Relationships

### Project Relationships

1. **Project → Technology**
   - One-to-many relationship
   - Each project can use multiple technologies
   - Technologies must exist in the system

2. **Project → Screenshot**
   - One-to-many relationship
   - Each project can have multiple screenshots
   - At least one screenshot must be marked as thumbnail

3. **Project → Link**
   - One-to-many relationship
   - Optional links to GitHub, live demo, etc.

### Skill Relationships

1. **Skill → SkillGroup**
   - Many-to-many relationship
   - Skills can belong to multiple groups
   - Groups can contain multiple skills

2. **Skill → Certification**
   - One-to-many relationship
   - Skills can have multiple certifications
   - Certifications are optional

### Experience Relationships

1. **Experience → Project**
   - One-to-many relationship
   - Experiences can include multiple projects
   - Projects can be referenced by multiple experiences

2. **Experience → Technology**
   - One-to-many relationship
   - Each experience can utilize multiple technologies

## Constraints

### Project Constraints

1. **ID Uniqueness**
   - Project IDs must be unique across the system
   - Format: lowercase alphanumeric with hyphens

2. **Required Fields**
   - Title, shortDescription, and category are required
   - At least one technology must be specified
   - Featured projects must have a thumbnail image

3. **Date Validation**
   - Start date must be valid ISO date string
   - End date must be after start date if specified

### Skill Constraints

1. **Level Range**
   - Skill level must be between 0 and 100
   - Level should represent current proficiency

2. **Experience Validation**
   - Years of experience must be positive number
   - Cannot exceed current year minus first use year

3. **Featured Skills**
   - Featured skills must have an icon
   - Featured skills must have a description

### Experience Constraints

1. **Date Validation**
   - Start date is required
   - End date must be after start date if specified
   - Dates must be valid ISO strings

2. **Required Fields**
   - Company, role, and description are required
   - At least one achievement must be specified
   - Location and type are required

3. **Project References**
   - Referenced projects must exist in the system
   - Circular references are not allowed

## Data Validation

All data validation is performed at multiple levels:

1. Frontend form validation
2. Service layer validation
3. Database constraints
4. TypeScript type checking

## Error Handling

Data validation errors should:

1. Provide specific error messages
2. Indicate which constraint was violated
3. Suggest corrective action

```

#### doc/architecture/routing/routes.md

```md
//TBD: to be done

```

#### doc/architecture/routing/ssr.md

```md
//TBD: to be done

```

#### doc/guides/routing/fragment-navigation.md

```md
# Fragment Navigation Guide

## Overview

Fragment navigation (also known as anchor navigation or hash navigation) allows for smooth scrolling to specific sections within a page. This guide explains how to implement fragment navigation in Angular using the Router.

## Implementation

### 1. Router Configuration

First, ensure your route configuration supports fragment navigation:

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'design-system',
    component: DesignSystemComponent,
    data: { 
      reuse: true // Important for maintaining state during fragment navigation
    }
  }
];
`

### 2. Template Setup

Add navigation links with fragments:

```typescript
<nav class="ds-nav">
  <a [routerLink]="[]" [fragment]="'colors'" routerLinkActive="active">Colors</a>
  <a [routerLink]="[]" [fragment]="'typography'" routerLinkActive="active">Typography</a>
  <!-- Additional navigation items -->
</nav>
```

### 3. Component Implementation

```typescript
@Component({
  // ... other component metadata
})
export class DesignSystemComponent implements AfterViewInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
```

### 4. CSS Considerations

```scss
// Essential CSS adjustments
.section {
  scroll-margin-top: 2rem; // Compensates for fixed header
}

.nav-link {
  // Navigation styling
  &.active {
    color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
  }
}
```

## Server-Side Rendering Considerations

When using fragment navigation with SSR:

1. Ensure proper hydration by waiting for `AfterViewInit`
2. Consider using `isPlatformBrowser` check for scrolling functionality
3. Handle initial fragment navigation after hydration

## Best Practices

1. **Unique IDs**: Ensure all target sections have unique IDs
2. **Accessible Navigation**: Include proper ARIA attributes for accessibility
3. **Smooth Scrolling**: Use CSS `scroll-behavior: smooth` for better performance
4. **Error Handling**: Always check for element existence before scrolling

## Common Issues and Solutions

1. **Fragment Not Working After Navigation**
   - Solution: Ensure route reuse is enabled
   - Implementation: Add `data: { reuse: true }` to route configuration

2. **Scroll Position Issues**
   - Solution: Use `scroll-margin-top` to account for fixed headers
   - Implementation: Add appropriate CSS to target sections

3. **SSR Hydration Problems**
   - Solution: Defer scrolling until after hydration
   - Implementation: Use `isPlatformBrowser` check

## Performance Optimization

1. Use `requestAnimationFrame` for smooth scrolling
2. Debounce scroll events if adding scroll spy functionality
3. Consider using Intersection Observer for advanced scroll tracking

## Example Implementation

Complete example of a reusable fragment navigation service:

```typescript
@Injectable({
  providedIn: 'root'
})
export class FragmentNavigationService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  initializeFragmentNavigation(options: { offset?: number } = {}) {
    if (isPlatformBrowser(this.platformId)) {
      this.route.fragment.subscribe(fragment => {
        this.scrollToFragment(fragment, options);
      });
    }
  }

  private scrollToFragment(fragment: string | null, options: { offset?: number }) {
    if (!fragment) return;
    
    const element = document.getElementById(fragment);
    if (element) {
      const offset = options.offset || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
```

## Testing

Include unit tests for fragment navigation:

```typescript
describe('FragmentNavigation', () => {
  // ... test implementation
});
```

## Related Documentation

- [Angular Router Documentation](https://angular.dev/guide/routing)
- [SSR with Angular](https://angular.dev/guide/ssr)
- [Web APIs - Scroll Behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)

```

#### doc/guides/routing/ssr-considerations.md

```md
# SSR Considerations for Navigation

this is a guide that covers best practices and solutions for **handling fragment navigation** in an **SSR context**. It includes key considerations, implementation strategies, common issues and solutions, testing, best practices, and related resources.

## Overview

Server-Side Rendering (SSR) introduces specific challenges for fragment navigation and scrolling behavior. This guide covers best practices and solutions for handling fragment navigation in an SSR context.

## Key Considerations

### 1. Platform Detection

Always check the platform before executing client-side specific code:

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({...})
export class NavigationComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToElement(elementId: string) {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side scrolling logic
    }
  }
}
```

### 2. Hydration Timing

Fragment navigation should be initialized after hydration is complete:

```typescript
@Component({...})
export class AppComponent implements AfterViewInit {
  constructor(
    private fragmentNav: FragmentNavigationService
  ) {}

  ngAfterViewInit() {
    // Ensure hydration is complete before initializing navigation
    this.fragmentNav.initializeFragmentNavigation({
      offset: 64 // Header height
    });
  }
}
```

### 3. State Management During SSR

Handle state differences between server and client:

```typescript
@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  private readonly initialFragment = signal<string | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve initial fragment from URL on client side
      const hash = window.location.hash;
      if (hash) {
        this.initialFragment.set(hash.slice(1));
      }
    }
  }
}
```

## Implementation Strategy

### 1. Server-Side Setup

```typescript
// app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  {
    path: 'design-system',
    renderMode: RenderMode.Server,
    // Cache headers for static content
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  }
];
```

### 2. Client-Side Hydration

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: 'HYDRATION',
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return isPlatformBrowser(platformId) ? provideClientHydration() : [];
      }
    }
  ]
};
```

### 3. Fragment Navigation Service with SSR Support

```typescript
@Injectable({
  providedIn: 'root'
})
export class FragmentNavigationService {
  private isHydrated = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Mark as hydrated after initial render
      afterNextRender(() => {
        this.isHydrated.set(true);
      });
    }
  }

  scrollToFragment(fragment: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait for hydration before scrolling
    effect(() => {
      if (this.isHydrated()) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
```

## Common Issues and Solutions

### 1. Hydration Mismatch

**Problem**: Content mismatch between server and client renders.

**Solution**:

```typescript
@Component({
  template: `
    @if (isPlatformBrowser(platformId)) {
      <div #scrollContainer>
        <!-- Scrollable content -->
      </div>
    }
  `
})
```

### 2. Scroll Position Restoration

**Problem**: Incorrect scroll position after navigation.

**Solution**:

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration()
  ]
};
```

### 3. Performance Optimization

Optimize resource loading for faster hydration:

```typescript
// design-system.component.ts
@Component({
  providers: [
    {
      provide: PRELOAD_STRATEGY,
      useValue: PreloadAllModules
    }
  ]
})
```

## Testing

Include specific tests for SSR scenarios:

```typescript
describe('FragmentNavigation in SSR', () => {
  it('should not attempt to scroll on server', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    });
    // ... test implementation
  });
});
```

## Best Practices

1. Always use platform checks for browser-specific code
2. Handle initial navigation after hydration
3. Implement proper error handling for missing elements
4. Use appropriate cache headers for static content
5. Consider performance implications of client-side navigation

## Related Resources

- [Angular SSR Guide](https://angular.dev/guide/ssr)
- [Navigation Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API)
- [Web Vitals](https://web.dev/vitals/)

```

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
    renderMode: RenderMode.Client // Per ora rendiamo tutto lato client Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Client // Per ora rendiamo tutto lato client Prerender,
  },
  {
    path: 'skills',
    renderMode: RenderMode.Client // Per ora rendiamo tutto lato client Prerender,
  },
  {
    path: 'experience',
    renderMode: RenderMode.Client // Per ora rendiamo tutto lato client Prerender,
  },
  {
    // La pagina design system dovrebbe essere server-rendered perché potrebbe cambiare più frequentemente
    path: 'design-system',
    renderMode: RenderMode.Client, // Per ora rendiamo tutto lato client Server,
  },
  {
    // Fallback per tutte le altre route
    path: '**',
    renderMode: RenderMode.Client, // Per ora rendiamo tutto lato client Server,
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
  shortDescription: string;
  fullDescription: string;
    technologies: string[];
  role: string;
  duration: {
    start: string;  // ISO date string
    end?: string;   // Optional ISO date string
  };
  features: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: {
    thumbnail: string;
    screenshots: string[];
  };
  category: ProjectCategory;
    featured: boolean;
  status: ProjectStatus;
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'Web Development',
  ENTERPRISE = 'Enterprise Software',
  MOBILE = 'Mobile Development',
  DESIGN_SYSTEM = 'Design System'
}

export enum ProjectStatus {
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived'
  }

  export interface SkillGroup {
    id: string;
    name: string;
    description: string;
    skills: Skill[];
  }
  

  export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number; // 0-100
    yearsOfExperience: number;
    keywords: string[];
    description?: string;
    certifications?: Certification[];
    featured?: boolean;
    icon?: string;  // Path to skill icon or icon identifier
  }


  export interface Certification {
    name: string;
    issuer: string;
    date: string;
    url?: string;
    validUntil?: string;
  }
  

  export enum SkillCategory {
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
    FRAMEWORK = 'Framework',
    LANGUAGE = 'Language',
    DATABASE = 'Database',
    TOOL = 'Tool',
    CLOUD = 'Cloud',
    SOFT = 'Soft Skill',
    METHODOLOGY = 'Methodology'
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

export interface About {
  personal: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  languages: Language[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: Location;
  social: Social;
}

export interface Location {
  country: string;
  timezone: string;
  workLocations: string[];
}

export interface Social {
  github: string;
  linkedin: string;
}

export interface ProfessionalSummary {
  shortBio: string;
  yearsOfExperience: number;
  coreTechnologies: string[];
  focus: string[];
  workingPreferences: WorkingPreferences;
}

export interface WorkingPreferences {
  preferred: string;
  available: string[];
  locations: string[];
}

export interface Language {
  code: string;
  name: string;
  level: string;
}
```

#### src/app/design-system/styles/_themes.scss

```scss
@use 'sass:map';
@use './variables' as vars;

:root {

  // Layout
  --header-height: 64px;

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
  --primary-rgb: 52, 152, 219;
  --primary-foreground: white;

  --secondary: var(--neutral-700);
  --secondary-rgb: 44, 62, 80;
  --secondary-foreground: var(--neutral-50);

  // Colori di stato
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;

  --surface: var(--neutral-50);
  --surface-rgb: 255, 255, 255;
  --surface-foreground: var(--neutral-900);
  --surface-variant: var(--neutral-100);
  --surface-variant-hover: var(--neutral-200);


  --text: var(--neutral-900);
  --text-rgb: 44, 62, 80;
  --text-secondary: var(--neutral-600);

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
  
  --secondary: var(--neutral-300);
  --secondary-foreground: var(--neutral-900);
  
  --surface: var(--neutral-800);
  --surface-foreground: var(--neutral-50);
  --surface-variant: var(--neutral-700);
  --surface-variant-hover: var(--neutral-600);
  
  --text: var(--neutral-50);
  --text-secondary: var(--neutral-400);

  --color-success: #34d399;
  --color-error: #f87171;
  --color-warning: #fbbf24;
  --color-info: #60a5fa;

  --primary-hover: var(--primary-300);

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

const bootstrap = () => {
  console.log('Bootstrapping Angular SSR application...');
  return bootstrapApplication(AppComponent, config);
};

export default bootstrap;

```

#### src/main.ts

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Applicazione bootstrap completata.'))
  .catch(err => console.error('Errore durante il bootstrap:', err));

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
  console.log(`Rendering route: ${req.url}`);
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
    .catch((err) => {
      console.error('SSR rendering error:', err);
      res.status(500).send('Internal Server Error');
    });
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

#### webpack.server.config.js

```js
const webpack = require('webpack');

module.exports = {
  target: 'node', // Ambiente Node.js
  plugins: [
    // Ignora il modulo fs, necessario solo per Node.js puro
    new webpack.IgnorePlugin({ resourceRegExp: /^fs$/ }),
    new webpack.IgnorePlugin({ resourceRegExp: /lokijs/ }) // Ignora completamente lokijs per la build SSR
  ]
};

```
