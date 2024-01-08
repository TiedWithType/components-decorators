import { componentTemplateParser } from './template-parser';
import { IComponentOptions } from '../types';
import { componentError } from './error';
import { componentEventMapper } from './event-mapper';
import { componentRegister } from './register';
import { componentConstructor } from './constructor';
import { componentTemplateRender } from './template-render';
import { componentObservableChanges } from './observable-changes';


/**
 * Initializes a component by setting up its options, handling dependencies, and configuring dynamic rendering.
 * @param {Function} target - The target component class.
 * @param {IComponentOptions} options - Options defining the component's behavior.
 * @returns {void}
 */
export const componentInit = (
  target: Function,
  options: IComponentOptions
): void => {
  try {
    const { object, component } = componentConstructor(target, options);

    componentRegister(component, options);
    componentObservableChanges({ object, component });
    componentTemplateRender(component);
    componentTemplateParser(component);
    componentEventMapper();
  } catch (error: any) {
    componentError(error);
  }
};
