import { componentTemplateParser } from './component/template-parser';
import { Component } from './types';
import { eventMap } from './utils';

/**
 * Decorator function to attach an event listener to a method within a component class.
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

    descriptor.value = (..._args: any[]): void => {
      Reflect.get(target, 'nodes').forEach(
        (node: HTMLElement): void => {
          if (Reflect.get(node, `__eventAttached_${eventName}`)) return;
          Reflect.set(node, `__eventAttached_${eventName}`, true);

          node.addEventListener(eventName, (event: Event) => {
            originalMethod.apply(target, [event.target]);
            Reflect.set(
              node,
              'innerHTML',
              Reflect.get(target, Component.template)
            );

            componentTemplateParser(<any>target);

            event.preventDefault();
            event.stopPropagation();
          });
        }
      );
    };

    eventMap.push(descriptor.value);
  };
};
