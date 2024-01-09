import { Component, IComponent, Node } from '@core/types';
import { transformHTML } from '@core/utils';
import { componentError } from './error';

/**
 * Renders and updates the template of a component, applying dynamic changes to associated DOM nodes.
 *
 * @param {IComponent} component - The component instance to render.
 * @returns {void}
 */
export const componentTemplateRender = (component: IComponent): void => {
  try {
    // Transform the raw render output into an HTML template.
    Reflect.set(
      component,
      Component.template,
      transformHTML(Reflect.get(component, Component.render))
    );

    // Update the template in each associated DOM node.
    Reflect.get(component, Component.nodes).forEach(
      (node: HTMLElement): void => {
        Reflect.set(
          node,
          Node.template,
          Reflect.get(component, Component.template)
        );
      }
    );
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
