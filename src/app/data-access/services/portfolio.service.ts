// src/app/data-access/services/portfolio.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PortfolioStore } from '../store/portfolio.store';
import { Project, Skill, Experience } from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(PortfolioStore);

  async loadInitialData() {
    try {
      this.store.setLoading(true);

      // In futuro questi dati verranno caricati da API/file
      const projects: Project[] = [/* dati di esempio */];
      const skills: Skill[] = [/* dati di esempio */];
      const experiences: Experience[] = [/* dati di esempio */];

      this.store.setProjects(projects);
      this.store.setSkills(skills);
      this.store.setExperiences(experiences);
    } catch (error) {
      this.store.setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.store.setLoading(false);
    }
  }
}
