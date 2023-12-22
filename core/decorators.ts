export type IComponent = {
  render(): string;
};

export const eventMap: (() => Promise<void>)[] = [];

export const Component = (selector: string): ClassDecorator => {
  return (target: Function): any => {
    const object: Object = Reflect.construct(target, []);
    const proto: IComponent = target.prototype;

    Reflect.set(proto, 'nodes', document.querySelectorAll(selector));

    Reflect.ownKeys(object).forEach((key: string | symbol): void => {
      let value = Reflect.get(object, key);

      Reflect.defineProperty(proto, key, {
        get: (): any => value,
        set: (newValue: any): void => {
          Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
            value = newValue || Reflect.get(object, key);
            Reflect.set(node, 'innerHTML', proto.render());
          });
        },
      });
    });

    Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
      Reflect.set(node, 'innerHTML', proto.render());
    });

    eventMap.forEach(
      async (event: () => Promise<void>): Promise<void> => await event(),
    );

    return target;
  };
};

export const eventListener = (eventName: string): MethodDecorator => {
  return (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): void => {
    const originalMethod: any = descriptor.value;

    descriptor.value = (..._args: any[]): void => {
      if (Reflect.get(target, '__eventAttached')) return;

      Reflect.get(target, 'nodes').forEach((node: HTMLElement): void => {
        Reflect.set(target, '__eventAttached', true);
        node.addEventListener(eventName, (event: Event) => {
          originalMethod.apply(target, [event.target]);
        });
      });
    };

    eventMap.push(descriptor.value);
  };
};
