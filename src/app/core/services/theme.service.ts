// src/app/core/services/theme.service.ts
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
    // Reagisce ai cambiamenti del tema e aggiorna il DOM
    effect(() => {
      this.updateThemeClass(this.themeSignal());
    });

    // Ascolta i cambiamenti del tema di sistema
    this.watchSystemTheme();
  }
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light'; // Default theme per SSR
    }

  // Modifica l'ordine di priorità: prima controlliamo il matchMedia,
  // poi salviamo la preferenza nel localStorage
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme;
  }

  return prefersDark ? 'dark' : 'light';
}

  private watchSystemTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          // Aggiorna solo se non ci sono preferenze salvate
          this.themeSignal.set(e.matches ? 'dark' : 'light');
        }
      });
  }

  private updateThemeClass(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.themeSignal.update(current => current === 'light' ? 'dark' : 'light');
  }

  setTheme(theme: Theme) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.themeSignal.set(theme);
  }
}