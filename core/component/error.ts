/**
 * Handles and logs a component-related error by updating the document body with an error message.
 *
 * @param {Error} error - The error object representing the encountered issue.
 * @returns {void}
 */
export const componentError = (error: Error): void => {
  // Update the document body to display an error message.
  Reflect.set(
    document.body,
    'innerHTML',
    `<div style='place-self: center; color: #F44336; text-align: center; font-weight: 900'>${error}</div>`
  );
};
