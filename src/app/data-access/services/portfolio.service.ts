// src/app/data-access/services/portfolio.service.ts
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { firstValueFrom } from 'rxjs';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';
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
      // if (projects.length === 0) {
      //   // await this.githubSyncService.syncData();
      //   await this.loadInitialDataFromJson();
      // } else {
      //   this.store.setProjects(projects);
      //   this.store.setSkills(skills);
      //   this.store.setExperiences(experiences);
      // }

      await this.handleDataSync();

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
      console.log('Loading initial data from JSON...');
      const response = await firstValueFrom(
        this.http.get<{
          projects: Project[];
          skills: Skill[];
          experiences: Experience[];
        }>('/assets/data/initial-data.json')
      );

      console.log('Initial data loaded:', response);

      if (!response) throw new Error('No initial data available');

      // Raggruppa le operazioni per tipo
      const projectUpserts = response.projects.map(p => this.db.upsertData('projects', p));
      const skillUpserts = response.skills.map(s => this.db.upsertData('skills', s));
      const experienceUpserts = response.experiences.map(e => this.db.upsertData('experiences', e));

      // Attendi che tutte le operazioni dello stesso tipo siano completate
      const [savedProjects, savedSkills, savedExperiences] = await Promise.all([
        Promise.all(projectUpserts),
        Promise.all(skillUpserts),
        Promise.all(experienceUpserts)
      ]);

      console.log('Data saved to DB:', {
        projects: savedProjects.length,
        skills: savedSkills.length,
        experiences: savedExperiences.length
      });



      // Aggiorna lo store
      this.store.setProjects(savedProjects);
      this.store.setSkills(savedSkills);
      this.store.setExperiences(savedExperiences);
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
