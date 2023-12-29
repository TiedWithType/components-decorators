type IComponentOptions = {
  selector: string;
  dependencies?: Function[];
};

export type IComponent = {
  get render(): string;
};

export const eventMap: (() => Promise<void>)[] = [];

export const Component = (options: IComponentOptions): ClassDecorator => {
  return (target: Function): any => {
    try {
      const object: Object = Reflect.construct(
        target,
        options.dependencies?.map((dependency: Function) =>
          Reflect.construct(dependency, [])
        ) || []
      );
      const proto: IComponent = target.prototype;

      Reflect.set(proto, 'nodes', document.querySelectorAll(options.selector));

      Reflect.ownKeys(object).forEach((key: string | symbol): void => {
        let value = Reflect.get(object, key);

        Reflect.defineProperty(proto, key, {
          get: (): any => value,
          set: (newValue: any): void => {
            Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
              value = newValue || Reflect.get(object, key);
              Reflect.set(node, 'innerHTML', proto.render);
            });
          },
        });
      });

      Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
        Reflect.set(node, 'innerHTML', proto.render);
      });

      eventMap.forEach(
        async (event: () => Promise<void>): Promise<void> => await event()
      );

      return target;
    } catch (error: any) {
      Reflect.set(
        document.body,
        'innerHTML',
        `
        <div style='place-self: center; color: #F44336; text-align: center; font-weight: 900'>${error}</div>
      `
      );
    }
  };
};

export const eventListener = (eventName: string): MethodDecorator => {
  return (
    target: Object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const originalMethod: any = descriptor.value;

    descriptor.value = (..._args: any[]): void => {
      if (Reflect.get(target, '__eventAttached')) return;

      Reflect.get(target, 'nodes').forEach((node: HTMLElement): void => {
        Reflect.set(target, '__eventAttached', true);
        node.addEventListener(eventName, (event: Event) => {
          originalMethod.apply(target, [event.target]);
          Reflect.set(node, 'innerHTML', Reflect.get(target, 'render'));
        });
      });
    };

    eventMap.push(descriptor.value);
  };
};

export const Service = <T extends { new (...args: any[]): {} }>(
  constructor: T
): T => {
  let instance: InstanceType<T> | null = null;

  const handler: ProxyHandler<any> = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args) as InstanceType<T>;
      }
      return instance;
    },
  };

  return new Proxy(constructor, handler) as T;
};
