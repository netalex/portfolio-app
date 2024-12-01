// src/app/data-access/models/portfolio.models.ts

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  role: string;
  duration: {
    start: string;  // ISO date string
    end?: string;   // Optional ISO date string
  };
  features: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  images: {
    thumbnail: string;
    screenshots: string[];
  };
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'Web Development',
  ENTERPRISE = 'Enterprise Software',
  MOBILE = 'Mobile Development',
  DESIGN_SYSTEM = 'Design System'
}

export enum ProjectStatus {
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived'
}

export interface SkillGroup {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}


export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  yearsOfExperience: number;
  keywords: string[];
  description?: string;
  certifications?: Certification[];
  featured?: boolean;
  icon?: string;  // Path to skill icon or icon identifier
}


export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  validUntil?: string;
}


export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  FRAMEWORK = 'Framework',
  LANGUAGE = 'Language',
  DATABASE = 'Database',
  TOOL = 'Tool',
  CLOUD = 'Cloud',
  SOFT = 'Soft Skill',
  METHODOLOGY = 'Methodology'
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

export interface About {
  personal: PersonalInfo;
  professionalSummary: ProfessionalSummary;
  languages: Language[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: Location;
  social: Social;
}

export interface Location {
  country: string;
  timezone: string;
  workLocations: string[];
}

export interface Social {
  github: string;
  linkedin: string;
}

export interface ProfessionalSummary {
  shortBio: string;
  yearsOfExperience: number;
  coreTechnologies: string[];
  focus: string[];
  workingPreferences: WorkingPreferences;
}

export interface WorkingPreferences {
  preferred: string;
  available: string[];
  locations: string[];
}

export interface Language {
  code: string;
  name: string;
  level: string;
}
