// src/app/data-access/store/portfolio.store.ts
import { computed, Injectable, signal } from '@angular/core';
import { Project, Skill, Experience, About } from '../models/portfolio.models';

interface PortfolioState {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  about: About | null;
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
  about: null,
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
  readonly about = computed(() => this.state().about);
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

  readonly latestExperience = computed(() =>
    this.sortedExperiences()[0] || null
  );

  readonly skillsByCategory = computed(() => {
    const categories: Record<string, Skill[]> = {};
    this.skills().forEach(skill => {
      const category = skill.category;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill);
    });
    return categories;
  });

  readonly featuredSkills = computed(() =>
    this.skills().filter(s => s.featured)
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

  updateProject(project: Project) {
    this.state.update(state => ({
      ...state,
      projects: state.projects.map(p =>
        p.id === project.id ? project : p
      )
    }));
  }

  removeProject(projectId: string) {
    this.state.update(state => ({
      ...state,
      projects: state.projects.filter(p => p.id !== projectId)
    }));
  }

  setSkills(skills: Skill[]) {
    this.state.update(state => ({ ...state, skills }));
  }

  addSkill(skill: Skill) {
    this.state.update(state => ({
      ...state,
      skills: [...state.skills, skill]
    }));
  }

  updateSkill(skill: Skill) {
    this.state.update(state => ({
      ...state,
      skills: state.skills.map(s =>
        s.id === skill.id ? skill : s
      )
    }));
  }

  removeSkill(skillId: string) {
    this.state.update(state => ({
      ...state,
      skills: state.skills.filter(s => s.id !== skillId)
    }));
  }

  setExperiences(experiences: Experience[]) {
    this.state.update(state => ({ ...state, experiences }));
  }

  addExperience(experience: Experience) {
    this.state.update(state => ({
      ...state,
      experiences: [...state.experiences, experience]
    }));
  }

  updateExperience(experience: Experience) {
    this.state.update(state => ({
      ...state,
      experiences: state.experiences.map(e =>
        e.id === experience.id ? experience : e
      )
    }));
  }

  removeExperience(experienceId: string) {
    this.state.update(state => ({
      ...state,
      experiences: state.experiences.filter(e => e.id !== experienceId)
    }));
  }

  setAbout(about: About) {
    this.state.update(state => ({ ...state, about }));
  }

  setProjectTechnologyFilter(technology: string | undefined) {
    this.state.update(state => ({
      ...state,
      filters: { ...state.filters, projectTechnology: technology }
    }));
  }

  setSkillCategoryFilter(category: string | undefined) {
    this.state.update(state => ({
      ...state,
      filters: { ...state.filters, skillCategory: category }
    }));
  }

  clearFilters() {
    this.state.update(state => ({
      ...state,
      filters: {}
    }));
  }

  // Reset state
  reset() {
    this.state.set(initialState);
  }
}
