describe('Design System', () => {
  beforeEach(() => {
    cy.visit('/design-system');
  });

  describe('Components Showcase', () => {
    it('should display all core components', () => {
      cy.get('[data-testid="components-nav"]').within(() => {
        cy.contains('Button').click();
        cy.get('[data-testid="component-preview"]').should('be.visible');

        cy.contains('Card').click();
        cy.get('[data-testid="component-preview"]').should('be.visible');

        cy.contains('Form Elements').click();
        cy.get('[data-testid="component-preview"]').should('be.visible');
      });
    });

    it('should allow interactive component testing', () => {
      // Button testing
      cy.contains('Button').click();
      cy.get('[data-testid="component-playground"]').within(() => {
        cy.get('button[data-variant="primary"]').click();
        cy.get('button[data-variant="secondary"]').click();
        cy.get('button[disabled]').should('be.disabled');
      });

      // Form elements testing
      cy.contains('Form Elements').click();
      cy.get('[data-testid="component-playground"]').within(() => {
        cy.get('input[type="text"]').type('Test input');
        cy.get('select').select('Option 1');
        cy.get('input[type="checkbox"]').check();
      });
    });
  });

  describe('Theme Switching', () => {
    it('should switch between light and dark themes', () => {
      cy.get('[data-testid="theme-switcher"]').click();
      cy.get('body').should('have.class', 'dark-theme');

      cy.get('[data-testid="theme-switcher"]').click();
      cy.get('body').should('not.have.class', 'dark-theme');
    });

    it('should persist theme preference', () => {
      cy.get('[data-testid="theme-switcher"]').click();
      cy.reload();
      cy.get('body').should('have.class', 'dark-theme');
    });
  });

  describe('Documentation', () => {
    it('should display component documentation', () => {
      cy.contains('Button').click();
      cy.get('[data-testid="component-docs"]').within(() => {
        cy.get('code').should('be.visible');
        cy.get('table').should('be.visible');
        cy.contains('Props').should('be.visible');
        cy.contains('Events').should('be.visible');
      });
    });

    it('should show live code examples', () => {
      cy.contains('Button').click();
      cy.get('[data-testid="code-example"]').should('be.visible');
      cy.get('[data-testid="copy-code"]').click();
      cy.window().its('navigator.clipboard')
        .invoke('readText')
        .should('contain', '<ds-button');
    });
  });

  describe('Accessibility', () => {
    it('should maintain accessibility standards', () => {
      cy.injectAxe();
      cy.checkA11y();

      // Test specific components
      cy.contains('Button').click();
      cy.checkA11y('[data-testid="component-preview"]');

      cy.contains('Form Elements').click();
      cy.checkA11y('[data-testid="component-preview"]');
    });

    it('should support keyboard navigation', () => {
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'component-nav-item');

      cy.focused().type('{enter}');
      cy.get('[data-testid="component-preview"]').should('be.visible');

      cy.focused().tab();
      cy.focused().should('have.attr', 'data-testid', 'playground-control');
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive across different viewports', () => {
      // Mobile viewport
      cy.viewport('iphone-x');
      cy.get('[data-testid="components-nav"]').should('not.be.visible');
      cy.get('[data-testid="mobile-menu"]').should('be.visible');

      // Tablet viewport
      cy.viewport('ipad-2');
      cy.get('[data-testid="components-nav"]').should('be.visible');
      cy.get('[data-testid="mobile-menu"]').should('not.be.visible');

      // Desktop viewport
      cy.viewport(1920, 1080);
      cy.get('[data-testid="components-nav"]').should('be.visible');
      cy.get('[data-testid="component-preview"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('should lazy load component examples', () => {
      cy.intercept('GET', '/assets/examples/**').as('exampleLoad');

      cy.contains('Button').click();
      cy.wait('@exampleLoad').its('response.status').should('eq', 200);
    });

    it('should implement code splitting', () => {
      cy.window().its('performance').then((performance) => {
        const entries = performance.getEntriesByType('resource');
        const jsFiles = entries.filter(entry => entry.name.endsWith('.js'));
        expect(jsFiles.length).to.be.greaterThan(1);
      });
    });
  });
});