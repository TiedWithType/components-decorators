import { ElementSchema } from './types';

/**
 * Represents the custom element schema used for registering and managing component information.
 */
export const customElementSchema = {
  /**
   * Initializes the custom element schema by setting up an empty array in the global window object.
   * @returns {void}
   */
  init: (): void => {
    Reflect.set(window, 'CUSTOM_ELEMENT_SCHEMA', []);
  },

  /**
   * Registers a new element schema, avoiding duplicates.
   * @param {ElementSchema} schema - The element schema to be registered.
   * @returns {void}
   */
  register: (schema: ElementSchema): void => {
    // Initialize the custom element schema if not already initialized.
    !Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA') ? customElementSchema.init() : null;

    // Avoid registering elements with the same tag name.
    !schema.tagName ||
    Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA').some(
      (existing: ElementSchema) => existing.tagName === schema.tagName
    )
      ? null
      : Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA').push(schema);
  },

  /**
   * Retrieves the current collection of element schemas in the custom element schema.
   * @returns {ElementSchema[]} - The array of element schemas.
   */
  collection: (): ElementSchema[] =>
    Reflect.get(window, 'CUSTOM_ELEMENT_SCHEMA'),
};

