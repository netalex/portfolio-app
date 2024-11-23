# File di testo da /Users/netalex/Documents/PortfolioApp/materialiPerClaude

## design-system:API.md

```
# Design System API Documentation

## Components

### Button
```typescript
@Component({
  selector: 'ds-button',
  template: `...`
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  
  @Output() clicked = new EventEmitter<void>();
}
```

#### Usage
```html
<ds-button 
  variant="primary"
  size="medium"
  [disabled]="false"
  [loading]="false"
  icon="arrow-right"
  iconPosition="right"
  (clicked)="handleClick()">
  Click Me
</ds-button>
```

### Card
```typescript
@Component({
  selector: 'ds-card',
  template: `...`
})
export class CardComponent {
  @Input() elevated: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
}
```

#### Usage
```html
<ds-card 
  [elevated]="true"
  [hoverable]="true"
  padding="medium">
  <ds-card-header>
    <h3>Card Title</h3>
  </ds-card-header>
  <ds-card-content>
    Content goes here
  </ds-card-content>
  <ds-card-footer>
    Footer content
  </ds-card-footer>
</ds-card>
```

[Additional components documentation...]

## Directives

### ClickOutside
```typescript
@Directive({
  selector: '[dsClickOutside]'
})
export class ClickOutsideDirective {
  @Output() dsClickOutside = new EventEmitter<void>();
}
```

#### Usage
```html
<div (dsClickOutside)="handleClickOutside()">
  Content
</div>
```

## Services

### ThemeService
```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  setTheme(theme: 'light' | 'dark'): void;
  toggleTheme(): void;
  getCurrentTheme(): string;
}
```

### BreakpointService
```typescript
@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isMatching$(breakpoint: string): Observable<boolean>;
  getCurrentBreakpoint(): string;
}
```

## Utils

### Functions
```typescript
function rem(pixels: number): string;
function hexToRgba(hex: string, alpha: number): string;
function getContrastRatio(color1: string, color2: string): number;
```

## Types and Interfaces

```typescript
interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  // ... other theme properties
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type Size = 'small' | 'medium' | 'large';
```

## CSS Custom Properties

```css
:root {
  --ds-color-primary: #007bff;
  --ds-color-secondary: #6c757d;
  --ds-spacing-unit: 8px;
  --ds-font-family: 'Inter', sans-serif;
  // ... other custom properties
}
```

```

## theme-variables.scss

```
// Colors
$primary-colors: (
  50: #e3f2fd,
  100: #bbdefb,
  200: #90caf9,
  300: #64b5f6,
  400: #42a5f5,
  500: #2196f3,  // primary
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
$font-sizes: (
  xs: 0.75rem,    // 12px
  sm: 0.875rem,   // 14px
  base: 1rem,     // 16px
  lg: 1.125rem,   // 18px
  xl: 1.25rem,    // 20px
  '2xl': 1.5rem,  // 24px
  '3xl': 1.875rem,// 30px
  '4xl': 2.25rem, // 36px
  '5xl': 3rem     // 48px
);

$font-weights: (
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
);

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
  16: 4rem,
  20: 5rem
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

// Z-index
$z-index: (
  negative: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal-backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070
);

// Transitions
$transitions: (
  fast: 150ms,
  normal: 300ms,
  slow: 500ms
);

// Border radius
$border-radius: (
  none: 0,
  sm: 0.125rem,
  base: 0.25rem,
  md: 0.375rem,
  lg: 0.5rem,
  xl: 0.75rem,
  full: 9999px
);

// Shadows
$shadows: (
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
);

```

## design-system-architecture.mermaid

```
graph TB
    subgraph Foundations
        T[Typography]
        C[Colors]
        S[Spacing]
        G[Grid]
        I[Icons]
    end

    subgraph Atoms
        B[Button]
        I[Input]
        L[Label]
        IC[Icon]
        TX[Text]
    end

    subgraph Molecules
        F[Form Field]
        CD[Card]
        AL[Alert]
        MD[Modal]
        NV[Navigation Item]
    end

    subgraph Organisms
        FRM[Form]
        HDR[Header]
        FTR[Footer]
        SB[Sidebar]
        TB[Toolbar]
    end

    subgraph Templates
        LP[Landing Page]
        DP[Detail Page]
        GP[Grid Page]
        PP[Profile Page]
    end

    subgraph Infrastructure
        TH[Theme Service]
        DS[Design Token Service]
        AS[Animation Service]
        LS[Layout Service]
    end

    Foundations --> Atoms
    Atoms --> Molecules
    Molecules --> Organisms
    Organisms --> Templates
    Infrastructure --> Foundations
    Infrastructure --> Atoms
    Infrastructure --> Molecules
    Infrastructure --> Organisms

    classDef foundation fill:#f9f9f9,stroke:#333,stroke-width:2px
    classDef component fill:#e6f3ff,stroke:#0066cc,stroke-width:2px
    classDef service fill:#f9e6ff,stroke:#6600cc,stroke-width:2px
    
    class T,C,S,G,I foundation
    class B,I,L,IC,TX,F,CD,AL,MD,NV,FRM,HDR,FTR,SB,TB component
    class TH,DS,AS,LS service

```

## data-structure.mermaid

```
erDiagram
    PROJECT ||--o{ TECHNOLOGY : uses
    PROJECT ||--o{ IMAGE : contains
    PROJECT ||--o{ LINK : has
    PROJECT {
        string id
        string title
        string description
        date startDate
        date endDate
        boolean featured
        string category
        string status
    }

    TECHNOLOGY {
        string id
        string name
        string category
        int experienceYears
    }

    SKILL ||--o{ PROJECT : demonstrates
    SKILL ||--o{ CATEGORY : belongsTo
    SKILL {
        string id
        string name
        int level
        int yearsOfExperience
        string description
        array keywords
    }

    EXPERIENCE ||--o{ PROJECT : includes
    EXPERIENCE ||--o{ TECHNOLOGY : utilizes
    EXPERIENCE {
        string id
        string company
        string position
        date startDate
        date endDate
        string description
        string location
        boolean current
    }

    BLOG-POST ||--o{ TAG : tagged
    BLOG-POST ||--o{ CATEGORY : belongsTo
    BLOG-POST {
        string id
        string title
        string content
        string excerpt
        date publishDate
        date lastModified
        string author
        int readingTime
        boolean featured
    }

    DESIGN-SYSTEM ||--o{ COMPONENT : contains
    DESIGN-SYSTEM ||--o{ PATTERN : includes
    DESIGN-SYSTEM {
        string id
        string name
        string version
        object theme
        object typography
        object spacing
    }

```

## testing-architecture.mermaid

```
graph TB
    subgraph Unit Tests
        COMP[Component Tests]
        SERV[Service Tests]
        PIPE[Pipe Tests]
        DIR[Directive Tests]
    end

    subgraph Integration Tests
        FEAT[Feature Tests]
        MOD[Module Tests]
        FLOW[Flow Tests]
    end

    subgraph E2E Tests
        USER[User Flows]
        PERF[Performance Tests]
        ACC[Accessibility Tests]
    end

    subgraph Test Infrastructure
        JEST[Jest]
        KARMA[Karma]
        CYPRESS[Cypress]
        LIGHT[Lighthouse]
    end

    subgraph CI Integration
        PRE[Pre-commit Hooks]
        BUILD[Build Validation]
        DEPLOY[Deploy Gates]
    end

    COMP --> JEST
    SERV --> JEST
    PIPE --> JEST
    DIR --> JEST

    FEAT --> KARMA
    MOD --> KARMA
    FLOW --> KARMA

    USER --> CYPRESS
    PERF --> LIGHT
    ACC --> CYPRESS

    JEST --> PRE
    KARMA --> BUILD
    CYPRESS --> DEPLOY
    LIGHT --> DEPLOY

    classDef test fill:#f9f,stroke:#333,stroke-width:2px
    classDef tool fill:#bbf,stroke:#333,stroke-width:2px
    classDef gate fill:#bfb,stroke:#333,stroke-width:2px

    class COMP,SERV,PIPE,DIR,FEAT,MOD,FLOW,USER,PERF,ACC test
    class JEST,KARMA,CYPRESS,LIGHT tool
    class PRE,BUILD,DEPLOY gate

```

## caching-strategy.mermaid

```
graph TB
    subgraph Browser
        SW[Service Worker]
        LC[Local Cache]
        IDB[IndexedDB]
        LS[Local Storage]
    end

    subgraph Cache Strategies
        NET[Network First]
        CACHE[Cache First]
        STALE[Stale While Revalidate]
        RACE[Race]
    end

    subgraph Resources
        STATIC[Static Assets]
        API[API Responses]
        IMAGES[Images]
        FONTS[Fonts]
    end

    subgraph Optimization
        LAZY[Lazy Loading]
        PRELOAD[Preloading]
        PREFETCH[Prefetching]
    end

    STATIC --> CACHE
    API --> STALE
    IMAGES --> NET
    FONTS --> RACE

    CACHE --> SW
    STALE --> SW
    NET --> SW
    RACE --> SW

    SW --> LC
    SW --> IDB
    SW --> LS

    LAZY --> STATIC
    PRELOAD --> FONTS
    PREFETCH --> API

    classDef strategy fill:#f9f,stroke:#333,stroke-width:2px
    classDef storage fill:#bbf,stroke:#333,stroke-width:2px
    classDef resource fill:#bfb,stroke:#333,stroke-width:2px
    classDef opt fill:#fbf,stroke:#333,stroke-width:2px

    class NET,CACHE,STALE,RACE strategy
    class SW,LC,IDB,LS storage
    class STATIC,API,IMAGES,FONTS resource
    class LAZY,PRELOAD,PREFETCH opt

```

## pull_request_template.md

```
# filename .github/pull_request_template.md
# Pull Request Description

## Changes Made
<!-- Detailed description of the changes implemented in this PR -->

## Type of Change
- [ ] Bug fix (non-breaking change addressing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Code style update (formatting, renaming)
- [ ] Refactoring (no functional changes, no api changes)
- [ ] Build related changes
- [ ] Documentation content changes
- [ ] Other (please describe):

## Related Issues
<!-- Link to relevant issues -->
Fixes #

## Testing
<!-- Describe the testing steps you've taken -->
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Screenshots
<!-- If applicable, add screenshots to help explain your changes -->

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] New and existing unit tests pass locally
- [ ] Any dependent changes have been merged and published

## Additional Notes
<!-- Any additional information that might be helpful -->

```

## i18n-flow.mermaid

```
sequenceDiagram
    participant U as User
    participant A as App
    participant LS as Language Service
    participant TS as Translation Service
    participant CS as Cache Service
    participant API as Translation Files

    U->>A: Access App
    A->>LS: Check Browser Language
    LS->>CS: Check Cached Language
    
    alt Has Cached Language
        CS-->>A: Return Cached Translations
    else No Cache
        LS->>API: Request Translations
        API-->>TS: Load Translation File
        TS->>CS: Cache Translations
        CS-->>A: Return Translations
    end
    
    A-->>U: Render UI in Selected Language

    U->>A: Change Language
    A->>LS: Update Language Preference
    LS->>CS: Update Cache
    LS->>API: Request New Translations
    API-->>TS: Load New Translation File
    TS->>CS: Cache New Translations
    A-->>U: Re-render UI in New Language

    note over A,TS: Lazy loading of translation chunks
    note over CS: Cache management with versioning
    note over TS: Fallback chain for missing translations

```

## github:workflows:ci-cd.yml

```
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint
      run: npm run lint
      
    - name: Run unit tests
      run: npm run test:ci
      
    - name: Build
      run: npm run build:prod
      
    - name: Archive build
      uses: actions/upload-artifact@v3
      with:
        name: build
        path: dist

  e2e-tests:
    needs: build-and-test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run Cypress tests
      uses: cypress-io/github-action@v5
      with:
        browser: chrome
        headless: true
        
  performance:
    needs: e2e-tests
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build
      uses: actions/download-artifact@v3
      with:
        name: build
        path: dist
        
    - name: Run Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        uploadArtifacts: true
        temporaryPublicStorage: true
        configPath: './lighthouserc.json'
        
  deploy:
    needs: performance
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build
      uses: actions/download-artifact@v3
      with:
        name: build
        path: dist
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        
    - name: Notify on Success
      if: success()
      uses: rtCamp/action-slack-notify@v2
      env:
        SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        SLACK_MESSAGE: 'Successfully deployed to production :rocket:'

```

## cicd-flow.mermaid

```
flowchart TD
    subgraph Development
        LC[Local Changes]
        TC[Run Tests]
        LB[Local Build]
    end

    subgraph GitHub Actions
        PR[Pull Request]
        CI[CI Pipeline]
        LINT[Lint Check]
        UT[Unit Tests]
        E2E[E2E Tests]
        BUILD[Production Build]
        PERF[Performance Check]
    end

    subgraph Deployment
        STAGE[Staging Deploy]
        PROD[Production Deploy]
        CDN[CDN Cache]
        PWA[PWA Update]
    end

    subgraph Monitoring
        LOG[Logging]
        METRICS[Performance Metrics]
        ERROR[Error Tracking]
    end

    LC --> TC
    TC --> LB
    LB --> PR
    PR --> CI
    CI --> LINT
    LINT --> UT
    UT --> E2E
    E2E --> BUILD
    BUILD --> PERF
    PERF --> STAGE
    STAGE -- Approval --> PROD
    PROD --> CDN
    PROD --> PWA
    PROD --> LOG
    PROD --> METRICS
    PROD --> ERROR

    classDef process fill:#f9f,stroke:#333,stroke-width:2px
    classDef check fill:#bbf,stroke:#333,stroke-width:2px
    classDef deploy fill:#bfb,stroke:#333,stroke-width:2px
    class LC,TC,LB process
    class LINT,UT,E2E,PERF check
    class STAGE,PROD,CDN,PWA deploy

```

## assets:README.md

```
# Assets Structure

```
assets/
├── images/
│   ├── og/                    # Open Graph images for social sharing
│   │   ├── home.jpg
│   │   ├── projects.jpg
│   │   ├── skills.jpg
│   │   ├── experience.jpg
│   │   ├── blog.jpg
│   │   └── design-system.jpg
│   ├── projects/             # Project screenshots and images
│   │   ├── portfolio/
│   │   │   ├── thumbnail.webp
│   │   │   ├── screenshot1.webp
│   │   │   └── screenshot2.webp
│   │   └── other-projects/
│   ├── blog/                 # Blog post images
│   │   ├── design-system.webp
│   │   └── testing.webp
│   ├── icons/               # App icons for PWA
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   └── profile/             # Personal photos and branding
│       ├── avatar.webp
│       └── logo.svg
├── fonts/                   # Self-hosted fonts
│   └── inter/
│       ├── inter-regular.woff2
│       ├── inter-medium.woff2
│       └── inter-bold.woff2
├── data/                    # Static JSON data
│   ├── projects.json
│   ├── skills.json
│   └── experiences.json
└── i18n/                    # Translation files
    ├── en.json
    ├── it.json
    └── fr.json
```

All images should be optimized and provided in modern formats (WebP) with fallbacks when necessary.
SVGs should be optimized using SVGO.

```

## design-system-structure.mermaid

```
graph TD
    DS[Design System] --> F[Foundations]
    DS --> C[Components]
    DS --> P[Patterns]
    DS --> G[Guidelines]

    F --> F1[Colors]
    F --> F2[Typography]
    F --> F3[Spacing]
    F --> F4[Grid]
    F --> F5[Icons]

    C --> C1[Atoms]
    C --> C2[Molecules]
    C --> C3[Organisms]

    C1 --> C1A[Buttons]
    C1 --> C1B[Inputs]
    C1 --> C1C[Icons]
    C1 --> C1D[Typography]

    C2 --> C2A[Forms]
    C2 --> C2B[Cards]
    C2 --> C2C[Navigation]
    C2 --> C2D[Modals]

    C3 --> C3A[Headers]
    C3 --> C3B[Footers]
    C3 --> C3C[Layouts]
    
    P --> P1[Navigation]
    P --> P2[Forms]
    P --> P3[Lists]
    P --> P4[Tables]

    G --> G1[Accessibility]
    G --> G2[Responsive]
    G --> G3[Animation]
    G --> G4[Voice & Tone]

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef highlight fill:#e6f3ff,stroke:#0066cc,stroke-width:2px;
    class DS,F,C,P,G highlight;

```

## navigation-flow.mermaid

```
flowchart TD
    Start((Start)) --> Home
    Home --> Projects
    Home --> Skills
    Home --> Experience
    Home --> Blog
    Home --> Contact
    Home --> DesignSystem

    Projects --> ProjectList[Projects List]
    ProjectList --> ProjectFilter[Filter Projects]
    ProjectList --> ProjectSort[Sort Projects]
    ProjectList --> ProjectDetail[Project Detail]
    ProjectDetail --> ProjectGallery[Project Gallery]
    ProjectDetail --> LiveDemo[Live Demo]
    ProjectDetail --> SourceCode[Source Code]

    Skills --> TechnicalSkills[Technical Skills]
    Skills --> SoftSkills[Soft Skills]
    TechnicalSkills --> SkillDetail[Skill Detail]
    TechnicalSkills --> SkillVisualization[Skill Visualization]

    Experience --> Timeline[Experience Timeline]
    Timeline --> ExperienceDetail[Experience Detail]
    ExperienceDetail --> CompanyInfo[Company Info]
    ExperienceDetail --> ProjectsList[Related Projects]

    Blog --> BlogList[Blog Posts List]
    BlogList --> BlogFilter[Filter Posts]
    BlogList --> BlogSearch[Search Posts]
    BlogList --> BlogPost[Blog Post]
    BlogPost --> RelatedPosts[Related Posts]

    DesignSystem --> DSIntro[Introduction]
    DesignSystem --> DSComponents[Components]
    DesignSystem --> DSPatterns[Patterns]
    DSComponents --> ComponentDemo[Component Demo]
    DSComponents --> ComponentCode[Component Code]
    DSComponents --> ComponentDocs[Component Documentation]

    style Start fill:#f96,stroke:#333,stroke-width:2px
    style Home fill:#9cf,stroke:#333,stroke-width:2px
    style ProjectDetail fill:#fcf,stroke:#333,stroke-width:2px
    style SkillVisualization fill:#fcf,stroke:#333,stroke-width:2px
    style BlogPost fill:#fcf,stroke:#333,stroke-width:2px
    style ComponentDemo fill:#fcf,stroke:#333,stroke-width:2px

```

## commit-template.txt

```
# filename: .gitmessage
# <type>(<scope>): <subject>
# |<----  Using a Maximum Of 50 Characters  ---->|

# Explain why this change is being made
# |<----   Try To Limit Each Line to a Maximum Of 72 Characters   ---->|

# Provide links or keys to any relevant tickets, articles or other resources
# Example: Closes: #23

# --- COMMIT END ---
# Type can be
#    feat     (new feature)
#    fix      (bug fix)
#    refactor (refactoring production code)
#    style    (formatting, missing semi colons, etc; no code change)
#    docs     (changes to documentation)
#    test     (adding or refactoring tests; no production code change)
#    chore    (updating grunt tasks etc; no production code change)
# --------------------
# Remember to
#    Capitalize the subject line
#    Use the imperative mood in the subject line
#    Do not end the subject line with a period
#    Separate subject from body with a blank line
#    Use the body to explain what and why vs. how
#    Can use multiple lines with "-" for bullet points in body
# --------------------

```

## auth-flow.mermaid

```
sequenceDiagram
    participant U as User
    participant C as Client App
    participant A as Auth Service
    participant G as GitHub API
    participant DB as Local Storage

    U->>C: Access Admin Area
    C->>DB: Check Local Token
    alt Has Valid Token
        DB-->>C: Return Token
        C->>G: Validate Token
        G-->>C: Token Valid
        C-->>U: Grant Access
    else No Token/Invalid
        DB-->>C: No Token/Expired
        C->>A: Redirect to Auth
        A->>G: GitHub OAuth Flow
        G-->>A: Auth Code
        A->>G: Exchange for Token
        G-->>A: Access Token
        A->>C: Return Token
        C->>DB: Store Token
        C-->>U: Grant Access
    end

    note over U,C: Admin actions require valid token
    note over C,G: Token refresh happens automatically
    note over A: Using GitHub as auth provider for admin

```

## site-structure.mermaid

```
graph TD
    A[Home] --> B[Progetti]
    A --> C[Competenze]
    A --> D[Esperienze Lavorative]
    A --> E[Blog]
    A --> F[Contatti]
    A --> G[Design System]
    
    B --> B1[Lista Progetti]
    B --> B2[Dettaglio Progetto]
    
    C --> C1[Competenze Tecniche]
    C --> C2[Soft Skills]
    
    D --> D1[Timeline Esperienze]
    D --> D2[Dettaglio Esperienza]
    
    E --> E1[Lista Articoli]
    E --> E2[Articolo Singolo]
    
    G --> G1[Introduzione]
    G --> G2[Principi di Design]
    G --> G3[Componenti UI]
    G --> G4[Patterns]
    G --> G5[Accessibilità]
    
    G3 --> G3A[Button]
    G3 --> G3B[Card]
    G3 --> G3C[Form Elements]
    G3 --> G3D[Navigation]
    
    H[Header] --> A
    I[Footer] --> A
    
    classDef highlight fill:#f9f,stroke:#333,stroke-width:2px;
    classDef designSystem fill:#bbf,stroke:#333,stroke-width:2px;
    class A highlight;
    class G designSystem;

```

## app-architecture.mermaid

```
graph TB
    subgraph Client Application
        UI[UI Layer]
        FM[Feature Modules]
        SM[Shared Module]
        CM[Core Module]
        DS[Design System]
        
        UI --> FM
        FM --> SM
        FM --> CM
        UI --> DS
        SM --> DS
    end

    subgraph State Management
        LS[Local Storage]
        LDB[LokiJS DB]
        GUN[GUN.js]
        
        CM --> LS
        CM --> LDB
        CM --> GUN
    end

    subgraph External Services
        GH[GitHub CMS]
        PWA[Service Worker]
        CDN[CDN Assets]
        
        CM --> GH
        UI --> PWA
        UI --> CDN
    end

    subgraph Development Tools
        TS[TypeScript]
        SCSS[SCSS]
        CDK[Angular CDK]
        
        UI --> TS
        UI --> SCSS
        DS --> CDK
    end

    subgraph Testing Infrastructure
        UNIT[Unit Tests]
        E2E[E2E Tests]
        COMP[Component Tests]
        
        FM --> UNIT
        UI --> E2E
        DS --> COMP
    end

    classDef primary fill:#f96,stroke:#333,stroke-width:2px;
    classDef secondary fill:#9cf,stroke:#333,stroke-width:2px;
    classDef external fill:#fcf,stroke:#333,stroke-width:2px;
    
    class UI,FM,CM primary;
    class DS,SM secondary;
    class GH,PWA,CDN external;

```

