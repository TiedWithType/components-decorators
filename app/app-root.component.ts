import { Component, IComponent } from '@core/decorators';

@Component('app-root')
export class AppRootComponent implements IComponent {
  title: string = 'AppRoot';

  render(): string {
    return `<h1>Hello from ${this.title} component</h1>`;
  }
}
