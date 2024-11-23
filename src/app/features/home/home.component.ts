import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../data-access/store/portfolio.store';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  template: `
  <div class="home-container">
      <section class="hero">
        <h1>Alessandro Aprile</h1>
        <h2>Frontend Developer</h2>
      </section>

    <section class="featured-projects">
      <h3>Featured Projects</h3>
      @for (project of featuredProjects(); track project.id) {
        <div class="project-card">
          <h4>{{ project.title }}</h4>
          <p>{{ project.description }}</p>
        </div>
      }
    </section>
  `,
  styles: [`
    .home-container {
      padding: var(--spacing-4);
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--gradient-primary);
    }

    .featured-projects {
      padding: 2rem;
    }
  `]
})
export class HomeComponent {
  private readonly store = inject(PortfolioStore);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  constructor() {
    this.title.setTitle('Alessandro Aprile - Frontend Developer');
    this.meta.updateTag({
      name: 'description',
      content: 'Portfolio of Alessandro Aprile, Frontend Developer specialized in Angular, React, and modern web technologies.'
    });
  }

  featuredProjects = this.store.featuredProjects;
}
