# Alessandro Aprile Portfolio Documentation

## Overview

This documentation covers the technical implementation of Alessandro Aprile's portfolio website, built with Angular 19. The documentation is organized into sections covering different aspects of the application. The DOC includes guides, API documentation, examples, and project structure information.

## Table of Contents

### Architecture

- **Data Layer**
  - [Data Models and Schema](./architecture/data/models.md)
  - [Data Relationships and Constraints](./architecture/data/relationships.md)
- **Design System**
  - [Components Overview](./architecture/design-system/components.md)
  - [Theme System](./architecture/design-system/theme.md)
- **Routing**
  - [Route Structure](./architecture/routing/routes.md)
  - [SSR Configuration](./architecture/routing/ssr.md)

### Guides

Detailed guides for implementing specific features and functionality.

#### Routing documentation

- [Fragment Navigation](./guides/routing/fragment-navigation.md)
- [SSR Considerations](./guides/routing/ssr-considerations.md)

### Development related guides

  - [Setup Guide](./guides/development/setup.md)
  - [Testing Guide](./guides/development/testing.md)

#### Design System documentation

- Component Architecture
- Theming System
- Responsive Design
- Accessibility Guidelines

#### State Management documentation

- Signal-based Store
- Data Flow
- Cache Strategy

### API Documentation

Technical documentation for the application's components and services.

#### Components

- Core Components
- Feature Components
- Shared Components

#### Services

- Database Service
- Portfolio Service
- Config Service

### Examples

Code examples and implementations.

#### Routing examples

- Fragment Navigation Examples
- Route Guards
- Lazy Loading

#### Components examples

- Reactive Forms
- Dynamic Content
- SSR-compatible Components

## Project Structure

The project follows a modular structure for better organization and maintainability.

```plaintext

PortfolioApp/
├── doc/                                               # Technical documentation and guides
│   ├── api/                                           # API documentation for components and services
│   │   └── components/                                # Component API specifications and usage
│   ├── examples/                                      # Code examples and implementations
│   │   └── routing/                                   # Routing examples and patterns
│   └── guides/                                        # Technical guides and best practices
├── public/                                            # Public static assets served at root level
├── src/                                               # Source code root directory
│   ├── app/                                           # Application code
│   │   ├── core/                                      # Core application logic and services
│   │   │   ├── components/                            # Essential app-wide components (header, footer)
│   │   │   ├── guards/                                # Route guards for navigation control
│   │   │   ├── interceptors/                          # HTTP interceptors for request/response handling
│   │   │   └── services/                              # Singleton services for core functionality
│   │   ├── data-access/                               # Data management and state layer
│   │   │   ├── models/                                # TypeScript interfaces and type definitions
│   │   │   ├── services/                              # Data services for API communication
│   │   │   └── store/                                 # Signal-based state management
│   │   ├── design-system/                             # Custom design system implementation
│   │   │   ├── components/                            # Reusable UI components
│   │   │   ├── documentation/                         # Design system documentation and examples
│   │   │   └── styles/                                # Design tokens and base styles
│   │   ├── features/                                  # Feature-specific modules
│   │   │   ├── design-system/                         # Design system showcase and documentation
│   │   │   ├── experience/                            # Work experience timeline feature
│   │   │   ├── home/                                  # Homepage implementation
│   │   │   ├── not-found/                             # 404 error page and handling
│   │   │   ├── projects/                              # Projects portfolio feature
│   │   │   └── skills/                                # Skills showcase feature
│   │   └── shared/                                    # Shared utilities across features
│   │       ├── components/                            # Common reusable components
│   │       ├── directives/                            # Custom Angular directives
│   │       └── pipes/                                 # Custom data transformation pipes
│   ├── assets/                                        # Static resources
│   │   ├── i18n/                                      # Translation files for multiple languages
│   │   ├── images/                                    # Image assets with optimized formats
│   │   └── styles/                                    # Global SCSS styles and variables
│   └── environments/                                  # Environment-specific configurations
└── toolsEVarie/                                       # Development support tools
    ├── markdownRepoComplessivo/                       # Repository snapshot generator output
    └── materialiPerClaude/                            # AI assistant context materials
        └── translations/                              # Translation examples and templates
```

### Development

#### Development server

```bash
npm run start
```

#### Running tests

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e
```

#### Building for production

```bash
npm run build:prod
```

## Key Features

### Server-Side Rendering

The application uses Angular's SSR capabilities for improved performance and SEO.

### Design System

A comprehensive design system built on Angular CDK.

### State Management

Efficient state management using Angular's Signals.

### Database

Local database implementation using LokiJS.

## Contributing

### Documentation Style Guide

- Use clear, concise language
- Include code examples where relevant
- Follow Markdown best practices
- Keep documentation up-to-date with code changes

### Pull Request Process

1. Update relevant documentation
2. Include inline code documentation
3. Update README if necessary
4. Follow commit message conventions

## Tools and Technologies

### Framework

- Angular 19
- TypeScript 5.5

### UI

- Angular CDK
- SCSS
- Custom Design System

### State Management stack

- Angular Signals
- RxJS

### Testing stack

- Jasmine
- Karma
- Cypress

### Database sw

- LokiJS

## Deployment

### Production Build

```bash
npm run build:prod
```

### SSR Build

```bash
npm run build:ssr
```

### Deployment Configuration

See [deployment guide](./guides/deployment.md) for detailed instructions.

## Technical Decisions

### Why Angular 19?

- Improved SSR support
- Signal-based reactivity
- Modern development features

### Database Choice

LokiJS was chosen for:

- Client-side persistence
- SSR compatibility
- Efficient querying

### Design System Architecture

Custom design system built for:

- Maintainability
- Consistency
- Performance

## Future Improvements

### Planned Features

- [ ] Internationalization support
- [ ] PWA implementation
- [ ] Advanced caching strategies

### Performance Optimizations

- [ ] Image optimization
- [ ] Code splitting
- [ ] Service worker implementation

## Troubleshooting

### Common Issues

- SSR hydration issues
- State management patterns
- Development environment setup

### Support

For technical support:

- Create an issue in the repository
- Contact the maintainers

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Contact

- **Developer**: Alessandro Aprile
- **GitHub**: [@netalex](https://github.com/netalex)
- **LinkedIn**: [Alessandro Aprile](https://www.linkedin.com/in/alessandro-aprile-0225106/)
- **Email**: <aprile.alessandro@gmail.com>
