// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Applicazione bootstrap completata.'))
  .catch(err => console.error('Errore durante il bootstrap:', err));
