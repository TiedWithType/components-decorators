export type IComponentOptions = {
  selector: string;
  dependencies?: Function[];
};

export type IComponent = {
  get render(): string;
};

export type Constructor = {
  object: Object;
  component: IComponent;
}

export type ElementSchema = {
  tagName: string;
  component: IComponent;
};

export enum Component {
  render = 'render',
  template = 'template',
  nodes = 'nodes',
  options = 'options',
}

export enum Node {
  template = 'innerHTML',
}
