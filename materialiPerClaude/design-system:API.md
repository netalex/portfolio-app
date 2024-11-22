# Design System API Documentation

## Components

### Button
```typescript
@Component({
  selector: 'ds-button',
  template: `...`
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  
  @Output() clicked = new EventEmitter<void>();
}
```

#### Usage
```html
<ds-button 
  variant="primary"
  size="medium"
  [disabled]="false"
  [loading]="false"
  icon="arrow-right"
  iconPosition="right"
  (clicked)="handleClick()">
  Click Me
</ds-button>
```

### Card
```typescript
@Component({
  selector: 'ds-card',
  template: `...`
})
export class CardComponent {
  @Input() elevated: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
}
```

#### Usage
```html
<ds-card 
  [elevated]="true"
  [hoverable]="true"
  padding="medium">
  <ds-card-header>
    <h3>Card Title</h3>
  </ds-card-header>
  <ds-card-content>
    Content goes here
  </ds-card-content>
  <ds-card-footer>
    Footer content
  </ds-card-footer>
</ds-card>
```

[Additional components documentation...]

## Directives

### ClickOutside
```typescript
@Directive({
  selector: '[dsClickOutside]'
})
export class ClickOutsideDirective {
  @Output() dsClickOutside = new EventEmitter<void>();
}
```

#### Usage
```html
<div (dsClickOutside)="handleClickOutside()">
  Content
</div>
```

## Services

### ThemeService
```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  setTheme(theme: 'light' | 'dark'): void;
  toggleTheme(): void;
  getCurrentTheme(): string;
}
```

### BreakpointService
```typescript
@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isMatching$(breakpoint: string): Observable<boolean>;
  getCurrentBreakpoint(): string;
}
```

## Utils

### Functions
```typescript
function rem(pixels: number): string;
function hexToRgba(hex: string, alpha: number): string;
function getContrastRatio(color1: string, color2: string): number;
```

## Types and Interfaces

```typescript
interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  // ... other theme properties
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type Size = 'small' | 'medium' | 'large';
```

## CSS Custom Properties

```css
:root {
  --ds-color-primary: #007bff;
  --ds-color-secondary: #6c757d;
  --ds-spacing-unit: 8px;
  --ds-font-family: 'Inter', sans-serif;
  // ... other custom properties
}
```
