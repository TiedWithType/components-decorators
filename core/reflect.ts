import { ElementSchema } from './types';

const elementSchema: ElementSchema[] = [];

export const customElementSchema = {
  init: (): void => {
    Reflect.set(window, 'CUSTOM_ELEMENT_SCHEMA', elementSchema);
  },
  register: (schema: ElementSchema): void => {
    !Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA')
      ? customElementSchema.init()
      : null;

    !schema.tagName ||
    Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA', elementSchema).some(
      (existing: ElementSchema) => existing.tagName === schema.tagName
    )
      ? null
      : Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA', elementSchema).push(
          schema
        );
  },
  collection: (): ElementSchema[] =>
    Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA'),
};
