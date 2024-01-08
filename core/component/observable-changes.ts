import { Constructor } from "@core/types";
import { componentTemplateRender } from "./template-render";

export const componentObservableChanges = ({object, component}: Constructor) => {
  Reflect.ownKeys(object).forEach((key: string | symbol): void => {
    let value = Reflect.get(object, key);

    Reflect.defineProperty(component, key, {
      get: (): any => value,
      set: (newValue: any): void => {
        value = newValue || Reflect.get(object, key);
        componentTemplateRender(component);
      },
    });
  });
}