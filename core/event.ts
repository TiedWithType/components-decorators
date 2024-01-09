import { componentTemplateParser } from './component/template-parser';
import { Component, Node } from './types';
import { eventMap } from './utils';

/**
 * Decorator function to attach an event listener to a method within a component class.
 *
 * @param {string} eventName - The name of the event to listen for (e.g., 'click', 'contextmenu').
 * @returns {MethodDecorator} - Decorator function to handle the event.
 */
export const eventListener = (eventName: string): MethodDecorator => {
  return (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const originalMethod: any = descriptor.value;

    // Override the original method with event handling logic.
    descriptor.value = (..._args: any[]): void => {
      Reflect.get(target, Component.nodes).forEach(
        (node: HTMLElement): void => {
          // Check if the event is already attached to the node.
          if (Reflect.get(node, `__eventAttached_${eventName}`)) return;
          Reflect.set(node, `__eventAttached_${eventName}`, true);

          // Add an event listener to the node, invoking the original method and updating the template.
          node.addEventListener(eventName, (event: Event) => {
            originalMethod.apply(target, [event.target]);
            Reflect.set(
              node,
              Node.template,
              Reflect.get(target, Component.template)
            );

            // Parse the template to handle nested components.
            componentTemplateParser(<any>target);

            // Prevent the default behavior and stop event propagation.
            event.preventDefault();
            event.stopPropagation();
          });
        }
      );
    };

    // Push the modified method to the eventMap for later invocation.
    eventMap.push(descriptor.value);
  };
};
