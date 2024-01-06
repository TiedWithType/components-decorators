export const html = (strings: any, ...values: any[]) => {
  // Use the raw strings and values to construct the HTML template
  let result = strings.reduce((acc: any, str: any, i: number) => {
    acc += str;

    if (i < values.length) {
      if (Array.isArray(values[i])) {
        // If the value is an array, join its elements
        acc += `[${values[i]}]`;
        // } else {
        //   // Otherwise, just append the value
        //   acc += values[i];
        // }
      }

      return acc;
    }
    ('');
  });

  console.log(result);

  // You can do further processing or return the result directly
  return result;
};
