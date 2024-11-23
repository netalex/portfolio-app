// // src/app/app.routes.ts
// import { Routes } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () => import('./features/home/home.component')
//       .then(m => m.HomeComponent),
//     title: 'Alessandro Aprile - Frontend Developer'
//   },
//   {
//     path: 'projects',
//     loadComponent: () => import('./features/projects/projects-list.component')
//       .then(m => m.ProjectsListComponent),
//     title: 'Projects - Alessandro Aprile'
//   }/* ,
//   {
//     path: 'skills',
//     loadComponent: () => import('./features/skills/skills-list.component')
//       .then(m => m.SkillsListComponent),
//     title: 'Skills - Alessandro Aprile'
//   },
//   {
//     path: 'experience',
//     loadComponent: () => import('./features/experience/experience-list.component')
//       .then(m => m.ExperienceListComponent),
//     title: 'Experience - Alessandro Aprile'
//   } */
// ];


// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Home page - prerenderizzata per ottimizzare la performance iniziale
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'projects',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'skills',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'experience',
    renderMode: RenderMode.Prerender,
  },
  {
    // La pagina design system dovrebbe essere server-rendered perché potrebbe cambiare più frequentemente
    path: 'design-system',
    renderMode: RenderMode.Server,
  },
  {
    // Fallback per tutte le altre route
    path: '**',
    renderMode: RenderMode.Server,
    status: 404 // Imposta lo status HTTP appropriato per pagine non trovate
  }
];
