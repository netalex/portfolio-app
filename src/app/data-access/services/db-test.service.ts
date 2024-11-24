// src/app/data-access/services/db-test.service.ts
import { Injectable, inject } from '@angular/core';
import { DatabaseService } from './database.service';
import { Project, Skill, Experience, SkillCategory } from '../models/portfolio.models';

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
          id: 'portfolio-2024',
          title: 'Portfolio 2024',
          description: 'Modern portfolio application built with Angular 19, featuring SSR, signal-based state management, and a custom design system.',
          technologies: ['Angular', 'TypeScript', 'SCSS', 'SSR', 'LokiJS'],
        featured: true,
          startDate: new Date('2024-01-01')
        },
        {
          id: 'alkemy-2024',
          title: 'ALKEMY - DNA Analysis System',
          description: 'Complex system for DNA analysis management for Italian Ministry of Justice',
          technologies: ['Angular', 'TypeScript', 'PrimeNG', 'Git'],
          featured: true,
          startDate: new Date('2024-07-01'),
          endDate: new Date('2024-10-01')
        }
      ];

      // Test Skills
      const testSkills: Skill[] = [
        {
          id: 'angular',
          name: 'Angular',
          category: SkillCategory.FRAMEWORK,
          level: 95,
          yearsOfExperience: 5,
          keywords: ['TypeScript', 'RxJS', 'NgRx', 'Angular Material', 'PrimeNG']
        },
        {
          id: 'react',
          name: 'React',
          category: SkillCategory.FRAMEWORK,
          level: 85,
          yearsOfExperience: 3,
          keywords: ['Redux', 'React Native', 'Hooks', 'Context API']
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          category: SkillCategory.LANGUAGE,
          level: 90,
          yearsOfExperience: 5,
          keywords: ['ES6+', 'Type System', 'Generics', 'Decorators']
        }
      ];

      // Test Experience
      const testExperiences: Experience[] = [
        {
          id: 'volo-2024',
          company: 'Volo Consulting/Orangee S.r.l',
          role: 'Frontend Developer',
          description: 'Development of DNA analysis management systems for the Italian Ministry of Justice',
          technologies: ['Angular', 'TypeScript', 'PrimeNG', 'Git'],
          startDate: '2024-07-01',
          endDate: '2024-10-01',
          location: 'Remote',
          type: 'remote'
        },
        {
          id: 'thinkopen-2024',
          company: 'THINKOPEN',
          role: 'Frontend Developer',
          description: 'Various frontend development roles including work with ICCREA and GFT',
          technologies: ['Angular', 'React', 'TypeScript', 'Node.js'],
          startDate: '2018-02-01',
          endDate: '2024-07-01',
          location: 'Milan',
          type: 'hybrid'
        }
      ];

      // Test Database Operations
      console.log('Clearing existing data...');
      await Promise.all([
        this.db.clearCollection('projects'),
        this.db.clearCollection('skills'),
        this.db.clearCollection('experiences')
      ]);

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

      // Test Skill Operations
      const testSkill: Skill = {
        id: 'skill-1',
        name: 'Angular',
        category: SkillCategory.FRAMEWORK,
        level: 90,
        yearsOfExperience: 5,
        keywords: ['TypeScript', 'RxJS']
      };

      console.log('Inserting test skill...');
      await this.db.upsertData('skills', testSkill);

      console.log('Reading skills...');
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
