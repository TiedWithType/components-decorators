import { customElementSchema } from '@core/reflect';
import { Component, IComponent, IComponentOptions } from '@core/types';
import { componentError } from './error';

/**
 * Registers a component, associating it with its options, DOM nodes, and custom element schema.
 *
 * @param {IComponent} component - The component instance to be registered.
 * @param {IComponentOptions} options - Options defining the component's behavior.
 * @returns {void}
 */
export const componentRegister = (
  component: IComponent,
  options: IComponentOptions
): void => {
  try {
    // Set the options and associated nodes within the component instance.
    Reflect.set(component, Component.options, options);
    Reflect.set(
      component,
      Component.nodes,
      document.querySelectorAll(options.selector)
    );

    // Register the component in the custom element schema.
    customElementSchema.register({
      tagName: options.selector.toUpperCase(),
      component,
    });
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
