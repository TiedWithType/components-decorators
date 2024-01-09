import { customElementSchema } from '@core/reflect';
import { Component, ElementSchema, IComponent } from '@core/types';
import { componentResolver } from './resolver';
import { componentError } from './error';

/**
 * Parses the template of a component and updates the DOM accordingly, resolving nested components.
 * 
 * @param {IComponent} component - The target component instance.
 * @returns {void}
 */
export const componentTemplateParser = (component: IComponent): void => {
  try {
    // Parse the HTML template to extract child component tags.
    const document: Document = new DOMParser().parseFromString(
      Reflect.get(component, Component.template),
      'text/html'
    );

    // Extract the tag names of child components.
    const children: string[] = Array.from(document.body.children).map(
      (child: Element) => child.tagName
    );

    // Resolve and initialize nested components based on the custom element schema.
    customElementSchema
      .collection()
      .filter((component: ElementSchema) =>
        children.find((tagName: string) => tagName === component.tagName)
      )
      .forEach((element: ElementSchema) => {
        componentResolver(element.component.constructor);
      });
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};

