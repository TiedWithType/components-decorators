import { Component, IComponent } from "@core/decorators";


@Component('app-root') export class AppRootComponent implements IComponent {
  title: string = 'AppRootComponent';

  render(): string {
    return `<h1>Hello from ${this.title}</h1>`;
  }
}