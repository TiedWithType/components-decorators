export const componentError = (error: Error): void => {
  Reflect.set(
    document.body,
    'innerHTML',
    `<div style='place-self: center; color: #F44336; text-align: center; font-weight: 900'>${error}</div>`
  );
};
