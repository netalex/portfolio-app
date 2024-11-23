// src/app/data-access/store/portfolio.store.ts
import { computed, Injectable, signal } from '@angular/core';
import { Project, Skill, Experience } from '../models/portfolio.models';

interface PortfolioState {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  filters: {
    projectTechnology?: string;
    skillCategory?: string;
  };
}

const initialState: PortfolioState = {
  projects: [],
  skills: [],
  experiences: [],
  loading: false,
  error: null,
  filters: {}
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioStore {
  // State
  private readonly state = signal<PortfolioState>(initialState);

  // Selectors
  readonly projects = computed(() => this.state().projects);
  readonly skills = computed(() => this.state().skills);
  readonly experiences = computed(() => this.state().experiences);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  // Computed selectors
  readonly featuredProjects = computed(() =>
    this.projects().filter(p => p.featured)
  );

  readonly filteredProjects = computed(() => {
    const tech = this.state().filters.projectTechnology?.toLowerCase();
    if (!tech) return this.projects();
    return this.projects().filter(p =>
      p.technologies.some(t => t.toLowerCase().includes(tech))
    );
  });

  readonly sortedExperiences = computed(() =>
    [...this.experiences()].sort((a, b) =>
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
  );

  // Actions
  setLoading(loading: boolean) {
    this.state.update(state => ({ ...state, loading }));
  }

  setError(error: string | null) {
    this.state.update(state => ({ ...state, error }));
  }

  setProjects(projects: Project[]) {
    this.state.update(state => ({ ...state, projects }));
  }

  addProject(project: Project) {
    this.state.update(state => ({
      ...state,
      projects: [...state.projects, project]
    }));
  }

  setSkills(skills: Skill[]) {
    this.state.update(state => ({ ...state, skills }));
  }

  setExperiences(experiences: Experience[]) {
    this.state.update(state => ({ ...state, experiences }));
  }

  setProjectTechnologyFilter(technology: string | undefined) {
    this.state.update(state => ({
      ...state,
      filters: { ...state.filters, projectTechnology: technology }
    }));
  }

  reset() {
    this.state.set(initialState);
  }
}
