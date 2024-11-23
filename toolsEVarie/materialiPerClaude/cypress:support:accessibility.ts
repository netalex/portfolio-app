import 'cypress-axe';

interface A11yConfig {
  runOnly?: {
    type: 'tag' | 'rule';
    values: string[];
  };
  rules?: Record<string, unknown>;
  disable?: string[];
}

class AccessibilityTester {
  private readonly config: A11yConfig = {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']
    },
    rules: {
      'color-contrast': { enabled: true },
      'heading-order': { enabled: true },
      'html-has-lang': { enabled: true },
      'valid-aria-role': { enabled: true }
    }
  };

  injectAxe() {
    cy.injectAxe();
  }

  checkA11y(
    context?: string,
    options?: A11yConfig,
    violationCallback?: (violations: any[]) => void
  ) {
    const mergedOptions = { ...this.config, ...options };

    cy.checkA11y(
      context,
      mergedOptions,
      violationCallback || this.defaultViolationCallback
    );
  }

  private defaultViolationCallback(violations: any[]) {
    violations.forEach(violation => {
      const nodes = Cypress.$(violation.nodes.map((node: any) => node.target).join(','));
      
      Cypress.log({
        name: 'A11Y',
        consoleProps: () => violation,
        $el: nodes,
        message: `[${violation.impact}] ${violation.help}`
      });
    });
  }

  customA11yTests() {
    return {
      checkFocusable: () => {
        cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
          .each($el => {
            cy.wrap($el)
              .focus()
              .should('have.focus');
          });
      },
      
      checkKeyboardNav: () => {
        cy.get('body').tab();
        cy.focused().should('exist');
      },
      
      checkAltText: () => {
        cy.get('img').each($img => {
          expect($img).to.have.attr('alt');
        });
      },
      
      checkAriaLabels: () => {
        cy.get('[role]').each($el => {
          const role = $el.attr('role');
          if (['button', 'link', 'tab'].includes(role)) {
            expect($el).to.have.attr('aria-label');
          }
        });
      }
    };
  }
}

export const a11y = new AccessibilityTester();

// Add custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      checkAccessibility(
        context?: string,
        options?: A11yConfig,
        violationCallback?: (violations: any[]) => void
      ): void;
      tabThrough(): void;
    }
  }
}

Cypress.Commands.add('checkAccessibility', (context, options, violationCallback) => {
  a11y.checkA11y(context, options, violationCallback);
});

Cypress.Commands.add('tabThrough', () => {
  cy.get('body').tab();
});
