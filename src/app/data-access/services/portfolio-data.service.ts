// src/app/data-access/services/portfolio-data.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { About } from '../models/portfolio.models';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigService } from '../../core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  // Cache della richiesta dei dati about
  private readonly aboutData$: Observable<About> = this.http.get<About>(
    '/assets/data/about.json'
  ).pipe(
    // Mappa i dati per assicurarsi che i tipi siano corretti
    map(data => this.validateAboutData(data)),
    // Gestione degli errori
    catchError(error => {
      console.error('Error loading about data:', error);
      return of(this.getDefaultAboutData());
    }),
    // Cache della risposta
    shareReplay(1)
  );

  /**
   * Recupera i dati about dal file JSON statico
   */
  getAboutData(): Observable<About> {
    return this.aboutData$;
  }

  /**
   * Valida i dati about e assicura che tutti i campi richiesti siano presenti
   */
  private validateAboutData(data: any): About {
    if (!data.personal || !data.professionalSummary || !data.languages) {
      throw new Error('Invalid about data structure');
    }

    // Validazione più dettagliata dei campi richiesti
    const requiredPersonalFields = ['name', 'title', 'email', 'phone', 'location', 'social'];
    for (const field of requiredPersonalFields) {
      if (!data.personal[field]) {
        throw new Error(`Missing required personal field: ${field}`);
      }
    }

    return data as About;
  }

  /**
   * Fornisce dati about di default in caso di errore
   */
  private getDefaultAboutData(): About {
    return {
      personal: {
        name: 'Alessandro Aprile',
        title: 'Frontend Developer',
        email: 'aprile.alessandro@gmail.com',
        phone: '+393200625543',
        location: {
          country: 'Italy',
          timezone: 'CET',
          workLocations: ['Remote', 'Milan', 'Rome']
        },
        social: {
          github: 'https://github.com/netalex',
          linkedin: 'https://www.linkedin.com/in/alessandro-aprile-0225106/'
        }
      },
      professionalSummary: {
        shortBio: 'Frontend developer specializing in Angular and React',
        yearsOfExperience: 10,
        coreTechnologies: ['Angular', 'React', 'TypeScript'],
        focus: ['Enterprise Applications', 'Design Systems', 'Frontend Architecture'],
        workingPreferences: {
          preferred: 'Remote',
          available: ['Remote', 'Hybrid'],
          locations: ['Milan', 'Rome']
        }
      },
      languages: [
        {
          code: 'it',
          name: 'Italian',
          level: 'Native'
        },
        {
          code: 'en',
          name: 'English',
          level: 'Fluent'
        },
        {
          code: 'fr',
          name: 'French',
          level: 'Fluent'
        }
      ]
    };
  }
}
