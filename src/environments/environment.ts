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
