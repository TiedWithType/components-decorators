import { Component, IComponent, Node } from "@core/types";
import { transformHTML } from "@core/utils";

export const componentTemplateRender = (component: IComponent) => {
  Reflect.set(
    component,
    Component.template,
    transformHTML(Reflect.get(component, Component.render))
  );
  
  Reflect.get(component, Component.nodes).forEach(
    (node: HTMLElement): void => {
      Reflect.set(
        node,
        Node.template,
        Reflect.get(component, Component.template)
      );
    }
  );

}