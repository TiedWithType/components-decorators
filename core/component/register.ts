import { customElementSchema } from '@core/reflect';
import { Component, IComponent, IComponentOptions } from '@core/types';

export const componentRegister = (
  component: IComponent,
  options: IComponentOptions
): void => {
  Reflect.set(component, Component.options, options);
  Reflect.set(
    component,
    Component.nodes,
    document.querySelectorAll(options.selector)
  );

  customElementSchema.register({
    tagName: options.selector.toUpperCase(),
    component,
  });
};
