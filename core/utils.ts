export const eventMap: (() => Promise<void>)[] = [];

/**
 * Transforms HTML code by applying custom logic, such as handling [forEach] directives.
 * @param {string} htmlCode - The input HTML code to transform.
 * @returns {string} - The transformed HTML code.
 */
export const transformHTML = (htmlCode: string): string => {
  const regex: RegExp =
    /<(\w+)\s+\[forEach\]="let\s+(\w+)\s+in\s+\[([^\]]+)]">(.*?)\{\{\s*(\w+)\s*\}\}(.*?)<\/\1>/g;

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

  return htmlCode.replace(regex, mapper).replace(/\s+/g, ' ').trim();
};

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