// src/app/data-access/services/portfolio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { PortfolioStore } from '../store/portfolio.store';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly db = inject(DatabaseService);
  private readonly store = inject(PortfolioStore);

  async loadInitialData() {
    try {
      this.store.setLoading(true);

      // Carica dati dal database locale
      const [projects, skills, experiences] = await Promise.all([
        this.db.getData<Project>('projects'),
        this.db.getData<Skill>('skills'),
        this.db.getData<Experience>('experiences')
      ]);

      // Se non ci sono dati nel db, carica i dati iniziali
      if (projects.length === 0) {
        await this.loadInitialDataFromApi();
      } else {
      this.store.setProjects(projects);
      this.store.setSkills(skills);
      this.store.setExperiences(experiences);
      }
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.store.setLoading(false);
    }
  }

  private async loadInitialDataFromApi() {
    // In futuro, questo metodo caricherà i dati da un'API reale
    // Per ora, usiamo dati di esempio
    const projects: Project[] = [
      {
        id: '1',
        title: 'Portfolio App',
        description: 'Personal portfolio website built with Angular',
        technologies: ['Angular', 'TypeScript', 'SCSS'],
        featured: true,
        startDate: new Date('2024-01-01')
      },
      // Altri progetti...
    ];

    const skills: Skill[] = [
      {
        id: '1',
        name: 'Angular',
        category: SkillCategory.FRAMEWORK, // Corretto il tipo
        level: 90,
        yearsOfExperience: 5,
        keywords: ['TypeScript', 'RxJS', 'NgRx']
      },
      // Altre skills...
    ];

    // Salva i dati nel database locale
    await Promise.all([
      ...projects.map(p => this.db.upsertData('projects', p)),
      ...skills.map(s => this.db.upsertData('skills', s))
    ]);

    // Aggiorna lo store
    this.store.setProjects(projects);
    this.store.setSkills(skills);
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
