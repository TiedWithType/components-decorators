import { Constructor, IComponentOptions } from '@core/types';

export const componentConstructor = (
  target: Function,
  options?: IComponentOptions
): Constructor => {
  return {
    object: Reflect.construct(
      target,
      options?.dependencies?.map((dependency: Function) =>
        Reflect.construct(dependency, [])
      ) || []
    ),
    component: target.prototype,
  };
};
