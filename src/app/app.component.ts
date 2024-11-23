import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//TODO: poterebbe essere interessante realizzare header e footer per la navigazione
// import { HeaderComponent } from './core/components/header.component';
// import { FooterComponent } from './core/components/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
    <router-outlet />
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'portfolio-app';
}
