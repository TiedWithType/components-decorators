import { IComponentOptions, IComponent } from './types';
import { transformHTML, eventMap } from './utils';

Reflect.set(window, 'CUSTOM_ELEMENT_SCHEMA', []);

export const ComponentResolver = (component: Function): void => {
  const ref = Reflect.construct(component, []);
  Component(Reflect.get(ref, 'options'))(component);
};

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

      Reflect.set(proto, 'options', options);
      Reflect.set(proto, 'nodes', document.querySelectorAll(options.selector));

      Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA').push({
        tag: options.selector.toUpperCase(),
        proto: proto,
      });

      Reflect.ownKeys(object).forEach((key: string | symbol): void => {
        let value = Reflect.get(object, key);

        Reflect.defineProperty(proto, key, {
          get: (): any => value,
          set: (newValue: any): void => {
            Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
              value = newValue || Reflect.get(object, key);
              Reflect.set(
                proto,
                'render_v2',
                transformHTML(Reflect.get(proto, 'render'))
              );
              Reflect.set(node, 'innerHTML', Reflect.get(proto, 'render_v2'));
            });
          },
        });
      });

      Reflect.set(
        proto,
        'render_v2',
        transformHTML(Reflect.get(proto, 'render'))
      );

      Reflect.get(proto, 'nodes').forEach((node: HTMLElement): void => {
        Reflect.set(node, 'innerHTML', Reflect.get(proto, 'render_v2'));
      });

      const parser = () => {
        const p: Document = new DOMParser().parseFromString(Reflect.get(proto, 'render_v2'), 'text/html');
        const custom: any[] = Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA');
        const ch = Array.from(p.body.children);
      
        const match = custom.filter(c => ch.find(e => e.tagName === c.tag));

        if(match.length > 0) {
          match.forEach(el => {
            ComponentResolver(el.proto.constructor)
          })
        }
      };
      
      parser();

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
