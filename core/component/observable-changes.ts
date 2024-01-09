import { Constructor } from '@core/types';
import { componentTemplateRender } from './template-render';
import { componentError } from './error';

/**
 * Observes changes in the properties of a component's instance and triggers template rendering accordingly.
 *
 * @param {Constructor} constructor - An object containing the component instance and its prototype.
 * @returns {void}
 */
export const componentObservableChanges = ({
  object,
  component,
}: Constructor): void => {
  try {
    // Iterate through the own keys of the component instance and set up property observation.
    Reflect.ownKeys(object).forEach((key: string | symbol): void => {
      let value = Reflect.get(object, key);

      // Define a getter and setter for each property to observe changes.
      Reflect.defineProperty(component, key, {
        get: (): any => value,
        set: (newValue: any): void => {
          // Update the property value and trigger template rendering.
          value = newValue || Reflect.get(object, key);
          componentTemplateRender(component);
        },
      });
    });
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
