/**
 * Array to store functions representing asynchronous events.
 * Each function in the array corresponds to an event handler.
 * The functions are expected to return Promises, allowing for asynchronous event handling.
 */
export const eventMap: (() => Promise<void>)[] = [];

/**
 * Represents a mapping function for transforming HTML code by applying custom logic.
 *
 * @param {any} _ - Placeholder for unused matches in the regular expression.
 * @param {string} tag - The HTML tag name.
 * @param {string} itemVariable - The variable used in the [forEach] directive.
 * @param {string} array - The array variable in the [forEach] directive.
 * @param {string} beforeText - The text before the variable in the transformed output.
 * @param {string} itemText - The text representing the variable in the transformed output.
 * @param {string} afterText - The text after the variable in the transformed output.
 * @returns {string} - The transformed HTML code.
 */
const mapper = (
  _: any,
  tag: string,
  itemVariable: string,
  array: string,
  beforeText: string,
  itemText: string,
  afterText: string
): string => {
  const items = array ? array.split(',').map((item) => item.trim()) : [];

  return items.length > 0 && itemVariable !== itemText
    ? _
    : items
        .map((itemValue) => {
          const replacedText = `${beforeText}${itemValue}${afterText}`;
          return `<${tag}>${replacedText.replace(
            `{{${itemVariable}}}`,
            itemValue
          )}</${tag}>`;
        })
        .join('\n');
};

/**
 * Transforms HTML code by applying custom logic, such as handling [forEach] directives.
 *
 * @param {string} htmlCode - The input HTML code to transform.
 * @returns {string} - The transformed HTML code.
 */
export const transformHTML = (htmlCode: string): string => {
  // Regular expression for identifying [forEach] directives in HTML code.
  const regex: RegExp =
    /<(\w+)\s+\[forEach\]="let\s+(\w+)\s+in\s+\[([^\]]+)]">(.*?)\{\{\s*(\w+)\s*\}\}(.*?)<\/\1>/g;

  // Apply the mapper function to transform HTML code and clean up extra spaces.
  return htmlCode.replace(regex, mapper).replace(/\s+/g, ' ').trim();
};

/**
 * Tagged template literal function for composing HTML strings with dynamic values.
 *
 * @param {TemplateStringsArray} strings - The array of static strings in the template.
 * @param {any[]} values - The array of dynamic values to be inserted into the template.
 * @returns {string} - The composed HTML string.
 */
export const html = (
  strings: TemplateStringsArray,
  ...values: Array<any>
): string =>
  strings.reduce(
    (acc: any, str: any, i: number) =>
      acc +
      str +
      (i < values.length
        ? Array.isArray(values[i])
          ? `[${values[i]}]`
          : values[i]
        : ''),
    ''
  );
