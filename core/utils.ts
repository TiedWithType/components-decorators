export const eventMap: (() => Promise<void>)[] = [];

export const transformHTML = (htmlCode: string): string => {
  const regex: RegExp =
    /<(\w+)\s+\[forEach\]="let\s+(\w+)\s+in\s+\[(.+?)\]">(.*?)\{\{\s*(\w+)\s*\}\}(.*?)<\/\1>/g;

  const mapper = (
    _: any,
    tag: string,
    __: any,
    array: string,
    beforeText: string,
    ___: string,
    afterText: string
  ): string => {
    const items = array ? array.split(',').map((item) => item.trim()) : [];
    const transformedItems = items.map((itemValue) => {
      const replacedText = `${beforeText}${itemValue}${afterText}`;
      return `<${tag}>${replacedText}</${tag}>`;
    });
    return transformedItems.join('\n');
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
