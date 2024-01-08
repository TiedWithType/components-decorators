import { Component } from '@core/component';
import { IComponent } from '@core/types';
import { html } from '@core/utils';

@Component({ selector: 'app-root' })
export class AppRootComponent implements IComponent {
  name: string = 'World';

  get render(): string {
    return html`<h1>Hello ${this.name}!!!</h1>`;
  }
}
