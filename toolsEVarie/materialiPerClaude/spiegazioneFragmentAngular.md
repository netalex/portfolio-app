AA [26-11-2024 18:45]

Nel nostro design system stiamo usando i fragment (chiamati anche anchor link o hash navigation) per navigare alle diverse sezioni della pagina. Ecco come funziona nel nostro codice:

1. Nel design-system.component.ts abbiamo:

```typescript
// Template con i link di navigazione
<nav class="ds-nav">
  <a [routerLink]="[]" [fragment]="'colors'" routerLinkActive="active">Colors</a>
  <a [routerLink]="[]" [fragment]="'typography'" routerLinkActive="active">Typography</a>
  // ...
</nav>
```

In questo codice:

- `[routerLink]="[]"` dice al router di rimanere sulla stessa route
- `[fragment]="'colors'"` aggiunge `#colors` all'URL
- `routerLinkActive="active"` aggiunge la classe 'active' quando quel fragment è attivo

2. Poi abbiamo il listener nel componente:

```typescript
export class DesignSystemComponent implements AfterViewInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    // Sottoscrizione ai cambiamenti del fragment
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
```

Questo codice:

1. Si sottoscrive ai cambiamenti del fragment nell'URL
2. Quando il fragment cambia, cerca l'elemento con l'ID corrispondente
3. Usa scrollIntoView per scorrere a quell'elemento

3. E gli elementi target nel template hanno gli ID corrispondenti:

```typescript
<section id="colors" class="section">
  // ...
</section>

<section id="typography" class="section">
  // ...
</section>
```

Quando un link viene cliccato:

1. Angular aggiorna l'URL aggiungendo il fragment (es: `/design-system#colors`)
2. Il nostro subscriber al fragment viene notificato
3. Viene trovato l'elemento con l'ID corrispondente
4. La pagina scorre fino a quell'elemento

Abbiamo anche aggiunto:

```css
.section {
  scroll-margin-top: 2rem; // Compensa l'header fisso
}
```

Per assicurarci che la sezione non finisca sotto l'header quando si scorre.

L'intero processo è gestito dal Router di Angular, che:

- Mantiene sincronizzato l'URL con lo stato dell'applicazione
- Fornisce osservabili per monitorare i cambiamenti (route.fragment)
- Gestisce la navigazione senza ricaricare la pagina
- Applica le classi active ai link quando necessario

È un sistema molto più robusto rispetto all'uso di semplici ancore HTML perché:

1. È integrato con il router di Angular
2. Supporta la navigazione SPA (Single Page Application)
3. Permette di rispondere ai cambiamenti programmaticamente
4. Mantiene uno stato coerente dell'applicazione

Ora il nostro design system può avere una navigazione interna fluida e mantenere uno stato coerente con l'URL, permettendo anche di condividere link diretti a sezioni specifiche.

