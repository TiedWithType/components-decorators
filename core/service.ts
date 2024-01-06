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
