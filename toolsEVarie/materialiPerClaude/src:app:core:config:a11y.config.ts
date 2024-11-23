export const a11yConfig = {
  rules: {
    // Focus management
    focusableElements: ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]'],
    skipLinks: [
      {
        id: 'skip-to-main',
        target: 'main-content',
        text: 'Skip to main content'
      },
      {
        id: 'skip-to-nav',
        target: 'main-nav',
        text: 'Skip to navigation'
      }
    ],
    
    // ARIA landmarks
    landmarks: {
      navigation: 'main-nav',
      main: 'main-content',
      search: 'search-form',
      complementary: 'sidebar'
    },
    
    // Keyboard navigation
    keyboardShortcuts: {
      navigation: {
        home: ['Alt', 'H'],
        search: ['Alt', 'S'],
        menu: ['Alt', 'M']
      }
    },
    
    // Contrast requirements
    contrast: {
      minimum: 4.5,  // WCAG AA standard
      enhanced: 7    // WCAG AAA standard
    },
    
    // Animation preferences
    animations: {
      reduceMotion: true,
      duration: {
        default: '300ms',
        fast: '150ms',
        slow: '500ms'
      }
    },
    
    // Form validation
    forms: {
      errorMessagePrefix: 'Error: ',
      requiredFieldSuffix: ' (required)',
      ariaDescribedBy: true,
      validateOnBlur: true
    },
    
    // Image alternatives
    images: {
      decorativeAlt: '',
      missingAltWarning: true
    },
    
    // Screen reader announcements
    announcements: {
      polite: 'aria-live-polite',
      assertive: 'aria-live-assertive',
      delay: 200
    }
  },
  
  // Testing configuration
  testing: {
    rules: [
      'wcag2a',
      'wcag2aa',
      'wcag21aa',
      'section508'
    ],
    ignoreRules: [],
    elementsToTest: [
      'button',
      'link',
      'input',
      'heading',
      'image'
    ]
  }
};
