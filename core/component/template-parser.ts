import { componentResolver } from './resolver';
import { customElementSchema } from '../reflect';
import { Component, ElementSchema, IComponent } from '../types';

/**
 * Parses the template of a component and updates the DOM accordingly.
 * @param {Function} target - The target component class.
 * @returns {void}
 */
export const componentTemplateParser = (component: IComponent) => {
  const document: Document = new DOMParser().parseFromString(
    Reflect.get(component, Component.template),
    'text/html'
  );

  const children: string[] = Array.from(document.body.children).map(
    (child: Element) => child.tagName
  );

  customElementSchema.collection()
    .filter((component: ElementSchema) =>
      children.find((tagName: string) => tagName === component.tagName)
    )
    .forEach((element: ElementSchema) => {
      componentResolver(element.component.constructor);
    });
};
