// // src/app/app.config.server.ts
// import { ApplicationConfig, inject, mergeApplicationConfig, RESPONSE_INIT, InjectionToken } from '@angular/core';
// import { provideServerRendering } from '@angular/platform-server';
// import { provideServerRoutesConfig } from '@angular/ssr';
// import { SERVER_RESPONSE } from '@frontends/domain';
// import { appConfig } from './app.config';
// import { serverRoutes } from './app.routes.server';

// export const SERVER_RESPONSE = new InjectionToken<ResponseInit>('SERVER_RESPONSE');

// const serverConfig: ApplicationConfig = {
//   providers: [
//     provideServerRendering(),
//     provideServerRoutesConfig(serverRoutes),
//     {
//       provide: SERVER_RESPONSE,
//       useFactory: () => {
//         return inject(RESPONSE_INIT, { optional: true });
//       },
//     },
//   ],
// };

// export const config = mergeApplicationConfig(appConfig, serverConfig);

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