describe('Portfolio Application', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Navigation', () => {
    it('should navigate through main sections', () => {
      // Check main navigation
      cy.get('nav').should('be.visible');
      cy.get('nav').contains('Projects').click();
      cy.url().should('include', '/projects');
      
      cy.get('nav').contains('Skills').click();
      cy.url().should('include', '/skills');
      
      cy.get('nav').contains('Experience').click();
      cy.url().should('include', '/experience');
    });

    it('should toggle theme', () => {
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('body').should('have.class', 'dark-theme');
      
      cy.get('[data-testid="theme-toggle"]').click();
      cy.get('body').should('not.have.class', 'dark-theme');
    });
  });

  describe('Projects Section', () => {
    beforeEach(() => {
      cy.visit('/projects');
    });

    it('should filter projects', () => {
      cy.get('[data-testid="project-filter"]').click();
      cy.contains('Web Development').click();
      cy.get('[data-testid="project-card"]').should('have.length.gt', 0);
    });

    it('should open project details', () => {
      cy.get('[data-testid="project-card"]').first().click();
      cy.get('[data-testid="project-detail"]').should('be.visible');
      cy.get('[data-testid="project-title"]').should('be.visible');
      cy.get('[data-testid="project-description"]').should('be.visible');
    });
  });

  describe('Skills Section', () => {
    beforeEach(() => {
      cy.visit('/skills');
    });

    it('should display skills chart', () => {
      cy.get('[data-testid="skills-chart"]').should('be.visible');
      cy.get('[data-testid="skill-item"]').should('have.length.gt', 0);
    });
  });

  describe('Experience Section', () => {
    beforeEach(() => {
      cy.visit('/experience');
    });

    it('should display experience timeline', () => {
      cy.get('[data-testid="experience-timeline"]').should('be.visible');
      cy.get('[data-testid="timeline-item"]').should('have.length.gt', 0);
    });
  });

  describe('Contact Form', () => {
    beforeEach(() => {
      cy.visit('/contact');
    });

    it('should submit contact form', () => {
      cy.get('[data-testid="contact-form"]').within(() => {
        cy.get('input[name="name"]').type('Test User');
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('textarea[name="message"]').type('Test message');
        cy.get('button[type="submit"]').click();
      });
      
      cy.get('[data-testid="success-message"]').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should navigate using keyboard', () => {
      cy.get('body').tab();
      cy.focused().should('have.attr', 'href', '/projects');
      
      cy.get('body').tab();
      cy.focused().should('have.attr', 'href', '/skills');
    });

    it('should have proper ARIA labels', () => {
      cy.get('nav').should('have.attr', 'aria-label', 'Main navigation');
      cy.get('main').should('have.attr', 'role', 'main');
    });
  });
});
