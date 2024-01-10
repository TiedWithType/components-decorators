import { Component } from '@core/component';
import { eventListener } from '@core/event';
import { html } from '@core/utils';

@Component({ selector: 'app-root' })
export class AppRootComponent {
  name: string = 'World';

  get render(): string {
    return `<h1>Hello ${this.name}!!!</h1><app-input></app-input>`;
  }
}

@Component({
  selector: 'app-input'
}) export class AppInput {
  content = '';

  get render(): string {
    return html`<input>`
  }

  @eventListener('input') likeApro(target: HTMLInputElement) {
   this.content = target.value;
  }
}