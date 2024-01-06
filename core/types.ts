export type IComponentOptions = {
  selector: string;
  dependencies?: Function[];
};

export type IComponent = {
  get render(): string;
};
