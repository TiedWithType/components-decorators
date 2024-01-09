/**
 * Service decorator that ensures a singleton pattern for a class.
 *
 * @template T - The class type.
 * @param {T} constructor - The class constructor function.
 * @returns {T} - The decorated class ensuring singleton behavior.
 */
export const Service = <T extends { new (...args: any[]): {} }>(
  constructor: T
): T => {
  // Initialize a variable to store the singleton instance.
  let instance: InstanceType<T> | null = null;

  // Define a Proxy handler to intercept the class instantiation and enforce singleton behavior.
  const handler: ProxyHandler<any> = {
    construct(target, args) {
      // Create a new instance only if it doesn't exist yet.
      if (!instance) {
        instance = Reflect.construct(target, args) as InstanceType<T>;
      }
      return instance;
    },
  };

  // Return a Proxy-wrapped version of the class, ensuring singleton behavior.
  return new Proxy(constructor, handler) as T;
};
