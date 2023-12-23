import {
  Component,
  IComponent,
  Service,
  eventListener,
} from '@core/decorators';

@Service
class MyService {
  title: string = Service.name;
}

@Component({ selector: 'app-root', dependencies: [MyService] })
export class AppRootComponent implements IComponent {
  title: string = 'AppRoot';

  constructor(private service: MyService) {}

  get render(): string {
    return `<h1>Hello from ${this.title}</h1>
    <pre>tip: click on <span >header</span> to see it change</pre>`;
  }
  @eventListener('click') onclick() {
    this.title = this.service.title;
  }
}
