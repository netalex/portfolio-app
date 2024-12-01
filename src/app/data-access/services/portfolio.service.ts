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
  private readonly dataInitialized = signal(false);

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
