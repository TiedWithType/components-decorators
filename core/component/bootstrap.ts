import { componentResolver } from '@core/resolver';

/**
 * Bootstraps a component by adding it to the DOM and resolving its dependencies.
 * @param {Function} component - The component class to be instantiated and added to the DOM.
 * @returns {void}
 */
export const componentBootstrap = (component: Function): void => {
  document.body.appendChild(
    document.createElement(Reflect.get(component.prototype.options, 'selector'))
  );

  componentResolver(component);
};
