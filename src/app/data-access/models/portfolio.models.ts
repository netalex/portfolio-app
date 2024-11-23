// src/app/data-access/models/portfolio.models.ts
export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    technologies: string[];
    demoUrl?: string;
    sourceUrl?: string;
    featured: boolean;
    startDate: Date;
    endDate?: Date;
  }

  export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number; // 0-100
    yearsOfExperience: number;
    keywords: string[];
  }

  export enum SkillCategory {
    FRONTEND = 'Frontend',
    FRAMEWORK = 'Framework',
    LANGUAGE = 'Language',
    TOOL = 'Tool',
    SOFT = 'Soft Skill'
  }

  export interface Experience {
    id: string;
    company: string;
    role: string;
    description: string;
    technologies: string[];
    startDate: string;  // ISO date string es '2022-01-15' -> ISO format
    endDate?: string;   // Optional ISO date string
    location: string;
    type: 'remote' | 'onsite' | 'hybrid';
  }
