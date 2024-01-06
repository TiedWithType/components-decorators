import { eventMap } from './utils';

export const eventListener = (eventName: string): MethodDecorator => {
  return (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const originalMethod: any = descriptor.value;

    descriptor.value = (..._args: any[]): void => {
      Reflect.get(target, 'nodes').forEach((node: HTMLElement): void => {
        if (Reflect.get(node, `__eventAttached_${eventName}`)) return;
        Reflect.set(node, `__eventAttached_${eventName}`, true);

        node.addEventListener(eventName, (event: Event) => {
          originalMethod.apply(target, [event.target]);
          Reflect.set(node, 'innerHTML', Reflect.get(target, 'render_v2'));

          event.preventDefault();
          event.stopPropagation();
        });
      });
    };

    eventMap.push(descriptor.value);
  };
};
