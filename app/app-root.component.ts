import { Component } from '@core/component';
import { eventListener } from '@core/event';
import { Service } from '@core/service';
import { IComponent } from '@core/types';
import { html } from '@core/utils';
@Service
class mService {
  arr = [100, 200, 300];
}

@Component({
  selector: 'app-list',
  dependencies: [mService],
})
export class AppListComponent implements IComponent {
  arr: number[] = [1, 2, 3];

  constructor(private m: mService) {}

  get render(): string {
    return html`<ul>
      <li [forEach]="let x in ${this.arr}">{{ x }}</li>
      <li [forEach]="let x in [4,6,8]">{{ x }}</li>
    </ul>`;
  }

  @eventListener('mouseenter') handler() {
    this.arr = this.m.arr;
  }

  @eventListener('mouseleave') handler2() {
    this.arr = [1, 2, 3];
  }
}

@Component({ selector: 'app-root' })
export class AppRootComponent implements IComponent {
  branch_name: string = 'main';

  get render(): string {
    return `<h1>This is ${this.branch_name} branch</h1>
      <h3>Some array values from service with mouse enter/leave changes</h3>
      <app-list></app-list> <app-list></app-list> `;
  }
}
