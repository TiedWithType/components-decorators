import { Component as ComponentDecorator } from '@core/component';
import { Component } from '@core/types';
import { componentConstructor } from './constructor';

export const componentResolver = (component: Function): void => {
  ComponentDecorator(
    Reflect.get(componentConstructor(component).object, Component.options)
  )(component);
};
