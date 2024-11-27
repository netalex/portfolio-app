
# Alessandro Aprile Portfolio

A modern portfolio application built with Angular 19, featuring server-side rendering, signal-based state management, and a custom design system.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-v19.0.0-red)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.5-blue)

## Features

- 🚀 Built with Angular 19
- 📱 Responsive design
- 🎨 Custom design system built on Angular CDK
- 📦 Signal-based state management
- 🖥️ Server-side rendering (SSR) support
- 💾 Local data persistence with LokiJS
- 🌐 Internationalization ready
- ⚡ Optimized performance
- 📊 Comprehensive testing suite

## Quick Start

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Angular CLI 19.0.1 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/netalex/portfolio-app.git

# Navigate to project directory
cd portfolio-2024

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run start

# Start development server with SSR
npm run dev:ssr

# Run tests
npm run test

# Run e2e tests
npm run e2e

# Build for production
npm run build:prod

# Build SSR
npm run build:ssr
```

Visit `http://localhost:4200/` in your browser. The application will automatically reload on source file changes.

## Project Structure

See the [Project Structure Documentation](./doc/README.md#project-structure) for a detailed overview of the codebase organization.

## Documentation

Comprehensive documentation is available in the `/doc` directory:

- [Technical Guides](./doc/guides/)
- [API Documentation](./doc/api/)
- [Code Examples](./doc/examples/)

## Development Tools

### Code Generation

Angular CLI provides powerful code generation tools:

```bash
# Generate a component
ng generate component features/my-feature

# Generate a service
ng generate service data-access/services/my-service

# View all available schematics
ng generate --help
```

### Testing

The project includes comprehensive testing setup:

- Unit Tests: Jasmine + Karma
- E2E Tests: Cypress
- Component Tests: Angular CDK Testing

```bash
# Run all tests
npm run test:all

# Run unit tests with coverage
npm run test:coverage

# Run e2e tests
npm run e2e
```

### Code Quality

The project maintains high code quality standards through:

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Commitlint for commit message consistency

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check types
npm run type-check
```

## Performance

The application is optimized for performance:

- SSR for improved initial load
- Lazy loading of features
- Image optimization
- Efficient state management
- Smart caching strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

**Alessandro Aprile**

- GitHub: [@netalex](https://github.com/netalex)
- LinkedIn: [Alessandro Aprile](https://www.linkedin.com/in/alessandro-aprile-0225106/)

## Acknowledgments

- [Angular Team](https://angular.dev/)
- [Fabio Biondi](https://www.fabiobiondi.dev/) for Angular training and inspiration
- All contributors and maintainers

## Contact

For questions or feedback:

- Email: <aprile.alessandro@gmail.com>
- LinkedIn: [Alessandro Aprile](https://www.linkedin.com/in/alessandro-aprile-0225106/)

---

Built with ❤️ using [Angular](https://angular.dev)
