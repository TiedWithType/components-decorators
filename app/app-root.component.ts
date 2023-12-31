import { Component, IComponent } from '@core/decorators';

@Component({ selector: 'app-root', dependencies: [] })
export class AppRootComponent implements IComponent {
  branch_name: string = 'main';

  get render(): string {
    return `<h1>This is ${this.branch_name} branch</h1>
    <h3>Please refer to other branches like:</h3>
    <ul>
      <li>core</li>
      <li>qqr</li>
      <li>todo-list</li>
    </ul>
    `;
  }
}
