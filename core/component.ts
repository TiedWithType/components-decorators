import { componentInit } from './component/init';
import { IComponentOptions } from './types';
import '@core/reflect';

/**
 * Decorator function to define a component class with specified options.
 *
 * @param {IComponentOptions} options - Options defining the behavior of the component.
 * @returns {ClassDecorator} - Decorator function for the component class.
 */
export const Component = (options: IComponentOptions): ClassDecorator => {
  return (target: Function): any => {
    // Initialize the component with the specified options.
    componentInit(target, options);
  };
};
