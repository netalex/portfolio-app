// src/app/data-access/services/portfolio.service.ts
import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { firstValueFrom } from 'rxjs';
import { Project, Skill, Experience, About } from '../models/portfolio.models';
import { isPlatformBrowser } from '@angular/common';
import { GitHubSyncService } from './github-sync.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly db = inject(DatabaseService);
  private readonly store = inject(PortfolioStore);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly dataInitialized = signal(false);
  private readonly githubSyncService = inject(GitHubSyncService);
  private readonly initialized = signal(false);

  // Signal readonly per l'UI
  readonly isInitialized = computed(() => this.initialized());

  getProjectsByExperience(experienceId: string) {
    return computed(() => {
      const experience = this.store.experiences().find(e => e.id === experienceId);
      if (!experience?.projects?.length) return [];

      return this.store.projects()
        .filter(project => experience.projects!.includes(project.id))
        .sort((a, b) => {
          return new Date(b.duration.start).getTime() -
                 new Date(a.duration.start).getTime();
        });
    });
  }

  async loadInitialData() {
    // Evitiamo di eseguire sul server e caricamenti multipli
    if (!isPlatformBrowser(this.platformId) || this.dataInitialized()) {
      return;
    }

    try {
      this.store.setLoading(true);

      // Attendiamo l'inizializzazione del database
      await this.db.waitForInitialization();

            // Carica dati dal database locale
      const [projects, skills, experiences, about] = await Promise.all([
        this.db.getData<Project>('projects'),
        this.db.getData<Skill>('skills'),
        this.db.getData<Experience>('experiences'),
        this.db.getData<About>('about')
      ]);

      if (projects.length === 0) {
        await this.handleDataSync();
      } else {
        this.store.setProjects(projects);
        this.store.setSkills(skills);
        this.store.setExperiences(experiences);
        if (about) {
          this.store.setAbout(about[0]);
        }
      }

      this.dataInitialized.set(true);
      this.initialized.set(true);
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
      console.log('Loading initial data from JSON...');
      const response = await firstValueFrom(
        this.http.get<{
          projects: Project[];
          skills: Skill[];
          experiences: Experience[];
          about: About; // Modificato: ora è un singolo oggetto, non un array
        }>('/assets/data/initial-data.json')
      );

      console.log('Initial data loaded:', response);
      if (!response) throw new Error('No initial data available');

      // Raggruppa le operazioni per tipo
      const projectUpserts = response.projects.map(p => this.db.upsertData('projects', p));
      const skillUpserts = response.skills.map(s => this.db.upsertData('skills', s));
      const experienceUpserts = response.experiences.map(e => this.db.upsertData('experiences', e));

      // Modifichiamo la gestione di about
      const aboutData = await this.db.upsertData('about', response.about);

      // Attendi che tutte le operazioni dello stesso tipo siano completate
      const [savedProjects, savedSkills, savedExperiences, /* savedAbout */] = await Promise.all([
        Promise.all(projectUpserts),
        Promise.all(skillUpserts),
        Promise.all(experienceUpserts)
      ]);

      console.log('Data saved to DB:', {
        projects: {
          count: savedProjects.length,
          items: savedProjects
        },
        skills: {
          count: savedSkills.length,
          items: savedSkills
        },
        experiences: {
          count: savedExperiences.length,
          items: savedExperiences
        },
        about: aboutData // Ora è un singolo oggetto
      });

      // Aggiorniamo lo store con i dati salvati
      this.store.setProjects(savedProjects);
      this.store.setSkills(savedSkills);
      this.store.setExperiences(savedExperiences);
      this.store.setAbout(aboutData); // Ora passiamo l'oggetto direttamente
    } catch (error) {
      console.error('Error loading initial data from JSON in loadInitialDataFromJson:', error);
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

  private async handleDataSync() {
    const loadData = async (dataFunction: () => Promise<any>) => {
      try {
        const result = await dataFunction();
        if (result && result.length > 0) {
          this.store.setProjects(result.projects);
          this.store.setSkills(result.skills);
          this.store.setExperiences(result.experiences);
          this.store.setAbout(result.about);
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    };

    const githubDataLoaded = await loadData(this.githubSyncService.syncData.bind(this.githubSyncService));
    if (!githubDataLoaded) {
      const jsonDataLoaded = await loadData(this.loadInitialDataFromJson.bind(this));
      if (!jsonDataLoaded) {
        throw new Error("No data");
      }
    }
  }
}
