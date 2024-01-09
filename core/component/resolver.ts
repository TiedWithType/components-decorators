import { Component as ComponentDecorator } from '@core/component';
import { Component } from '@core/types';
import { componentConstructor } from './constructor';
import { componentError } from './error';

/**
 * Resolves and initializes a component using its decorator and constructor.
 *
 * @param {Function} component - The component class to be resolved.
 * @returns {void}
 */
export const componentResolver = (component: Function): void => {
  try {
    // Obtain options from the constructed component instance and apply the decorator.
    ComponentDecorator(
      Reflect.get(componentConstructor(component).object, Component.options)
    )(component);
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
