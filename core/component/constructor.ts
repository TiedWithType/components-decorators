import { Constructor, IComponentOptions } from '@core/types';
import { componentError } from './error';

/**
 * Constructs and initializes a component instance along with its dependencies.
 *
 * @param {Function} target - The target component class.
 * @param {IComponentOptions} [options] - Options specifying the component's behavior.
 * @returns {Constructor} - An object containing the constructed component instance and its prototype.
 */
export const componentConstructor = (
  target: Function,
  options?: IComponentOptions
): Constructor => {
  try {
    // Construct the component instance with optional dependencies.
    const object = Reflect.construct(
      target,
      options?.dependencies?.map((dependency: Function) =>
        Reflect.construct(dependency, [])
      ) || []
    );

    // Return an object containing the constructed component instance and its prototype.
    return {
      object,
      component: target.prototype,
    };
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
    return <any>undefined;
  }
};
