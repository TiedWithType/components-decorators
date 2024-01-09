/**
 * Represents the options for configuring a component.
 */
export type IComponentOptions = {
  selector: string;
  dependencies?: Function[];
};

/**
 * Represents the basic structure of a component.
 */
export type IComponent = {
  get render(): string;
};

/**
 * Represents the structure of a constructor object containing the component instance and prototype.
 */
export type Constructor = {
  object: Object;
  component: IComponent;
};

/**
 * Represents the schema of an element, including its tag name and associated component.
 */
export type ElementSchema = {
  tagName: string;
  component: IComponent;
};

/**
 * Enumerates keys used in the context of a component.
 */
export enum Component {
  render = 'render',
  template = 'template',
  nodes = 'nodes',
  options = 'options',
}

/**
 * Enumerates keys related to the node properties.
 */
export enum Node {
  template = 'innerHTML',
}
