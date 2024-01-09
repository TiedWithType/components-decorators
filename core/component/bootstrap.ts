import { componentResolver } from '@core/resolver';
import { componentError } from './error';

/**
 * Bootstraps a component by adding it to the DOM and resolving its dependencies.
 *
 * @param {Function} component - The component class to be instantiated and added to the DOM.
 * @returns {void}
 */
export const componentBootstrap = (component: Function): void => {
  try {
    // Create an element based on the component's selector and append it to the document body.
    document.body.appendChild(
      document.createElement(
        Reflect.get(component.prototype.options, 'selector')
      )
    );

    // Resolve and initialize the component.
    componentResolver(component);
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
