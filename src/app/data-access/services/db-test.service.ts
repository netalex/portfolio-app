// src/app/data-access/services/db-test.service.ts
import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';
import {
  Project,
  ProjectCategory,
  ProjectStatus,
  Skill,
  SkillCategory,
  Experience
} from '../models/portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class DbTestService {
  private readonly db = inject(DatabaseService);

  async testDatabaseOperations() {
    console.log('Starting database operations test...');

    try {
      // Test Projects
      const testProjects: Project[] = [
        {
          "id": "TEST-portfolio-app-2024",
          "title": "TEST Personal Portfolio Website Application",
          "shortDescription": "TEST Modern portfolio website built with Angular and custom design system",
          "fullDescription": "TEST Advanced portfolio website showcasing frontend development expertise. Features include a custom design system, signal-based state management, SSR optimization, and multi-language support. Implements modern Angular 19 features including standalone components, new control flow, and signals for reactive state management.",
          "technologies": [
            "Angular 19",
            "TypeScript 5.5",
            "SCSS",
            "Angular CDK",
            "LokiJS",
            "SSR",
            "i18n"
          ],
          "role": "Full Stack Developer",
          "duration": {
            "start": "2024-11-01"
          },
          "features": [
            "Custom design system with theme support",
            "Signal-based state management",
            "Server-side rendering optimization",
            "Multi-language support (EN, IT, FR)",
            "Comprehensive test coverage"
          ],
          "links": {
            "github": "https://github.com/netalex/portfolio-app",
            "live": "https://alessandroaprile.dev"
          },
          "images": {
            "thumbnail": "/assets/images/projects/portfolio/thumbnail.webp",
            "screenshots": [
              "/assets/images/projects/portfolio/dashboard.webp",
              "/assets/images/projects/portfolio/design-system.webp"
            ]
          },
          category: ProjectCategory.ENTERPRISE,
          featured: true,
          status: ProjectStatus.IN_PROGRESS
        },
        {
          "id": "TEST-dna-analysis-alkemy-2024",
          "title": "TEST DNA Analysis Management System",
          "shortDescription": "TEST System for Italian Ministry of Justice's Joint Forces Command",
          "fullDescription": "TEST Worked on three interconnected projects for the Italian Ministry of Justice's Joint Forces Command, focusing on DNA analysis management systems. Implemented critical change requests, conducted thorough bug fixes, developed new features, and ensured seamless deployment across all projects.",
          "technologies": [
            "Angular",
            "TypeScript",
            "PrimeNG",
            "Git",
            "REST API"
          ],
          "role": "Frontend Developer",
          "duration": {
            "start": "2024-07-01",
            "end": "2024-10-01"
          },
          "features": [
            "Critical change requests implementation",
            "Bug fixes and stability improvements",
            "Feature development",
            "Cross-project integration",
            "Performance optimization"
          ],
          // Aggiunte le proprietà obbligatorie mancanti
          "links": {
            "github": "https://github.com/netalex/dna-analysis-system"
          },
          "images": {
            "thumbnail": "/assets/images/projects/dna-analysis/thumbnail.webp",
            "screenshots": [
              "/assets/images/projects/dna-analysis/main-view.webp"
            ]
          },
          category: ProjectCategory.ENTERPRISE,
          featured: true,
          status: ProjectStatus.COMPLETED
        }
      ];

      // Test Skills
      const testSkills: Skill[] = [
        {
          id: 'TEST-angular',
          name: 'TEST Angular',
          category: SkillCategory.FRAMEWORK,
          level: 95,
          yearsOfExperience: 5,
          keywords: ['TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'PrimeNG']
        },
        {
          id: 'TEST-react',
          name: 'TEST React',
          category: SkillCategory.FRAMEWORK,
          level: 85,
          yearsOfExperience: 3,
          keywords: ['Redux', 'React Native', 'Hooks', 'Context API']
        }
      ];

      // Test Experience
      const testExperiences: Experience[] = [
        {
          id: 'TEST-volo-2024',
          company: 'TEST Volo Consulting/Orangee S.r.l',
          role: 'Frontend Developer',
          description: 'Development of DNA analysis management systems for the Italian Ministry of Justice',
          technologies: ['Angular', 'TypeScript', 'PrimeNG', 'Git'],
          startDate: '2024-07-01',
          endDate: '2024-10-01',
          location: 'Remote',
          type: 'remote'
        }
      ];

      // Test Database Operations
      console.log('Clearing existing data for db test...');

      // Clear collections one by one
      for (const id of await this.db.getData<Project>('projects')) {
        await this.db.deleteData('projects', id.id);
      }

      for (const id of await this.db.getData<Skill>('skills')) {
        await this.db.deleteData('skills', id.id);
      }

      for (const id of await this.db.getData<Experience>('experiences')) {
        await this.db.deleteData('experiences', id.id);
      }

      console.log('Inserting test projects...');
      await Promise.all(testProjects.map(p => this.db.upsertData('projects', p)));

      console.log('Inserting test skills...');
      await Promise.all(testSkills.map(s => this.db.upsertData('skills', s)));

      console.log('Inserting test experiences...');
      await Promise.all(testExperiences.map(e => this.db.upsertData('experiences', e)));

      // Verify Data
      console.log('\nVerifying inserted data:');

      const projects = await this.db.getData<Project>('projects');
      console.log('Projects in DB:', projects);

            const skills = await this.db.getData<Skill>('skills');
      console.log('Skills in DB:', skills);

      const experiences = await this.db.getData<Experience>('experiences');
      console.log('Experiences in DB:', experiences);

      return {
        success: true,
        counts: {
          projects: projects.length,
          skills: skills.length,
          experiences: experiences.length
        }
      };

    } catch (error) {
      console.error('Database test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
