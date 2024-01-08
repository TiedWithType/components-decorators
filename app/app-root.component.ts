import { Component } from '@core/component';
import { eventListener } from '@core/event';
import { Service } from '@core/service';
import { IComponent } from '@core/types';
import { html } from '@core/utils';

@Service class serv {
  age = 100;
}

@Component({ selector: 'app-hello', dependencies: [serv] })
export class Hello implements IComponent {
  name: string = 'World';

  constructor(private s: serv ) {}

  get render(): string {
    return html`<h1>Hello ${this.s.age}!!!</h1>`;
  }
}

@Component({ selector: 'app-hello2' })
export class Hello2 implements IComponent {
  name: string = 'World 2';

  get render(): string {
    return html`<h2>Hello ${this.name}!!!</h2>`;
  }
}

@Component({ selector: 'app-root' })
export class AppRootComponent implements IComponent {
  get render(): string {
    return html`
      <app-hello></app-hello>
      <p [forEach]="let x in ${this.arr}">got {{ x }} !!!</p>
      <app-hello2></app-hello2>
      <p [forEach]="let x in ${this.arr}">got {{ x }} !!!</p>
    `;
  }

  arr = [1, 2, 3, 'boo bobo'];

  @eventListener('click') click() {
    this.arr = ['boo!'];
  }

  @eventListener('contextmenu') click2() {
    this.arr = ['boxo!'];
  }
}
