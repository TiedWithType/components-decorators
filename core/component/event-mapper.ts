import { eventMap } from '@core/utils';
import { componentError } from './error';

/**
 * Invokes events from the eventMap, handling each asynchronously.
 *
 * @returns {void}
 */
export const componentEventMapper = (): void => {
  try {
    // Iterate through the eventMap and invoke each event asynchronously.
    eventMap.forEach(
      async (event: () => Promise<void>): Promise<void> => await event()
    );
  } catch (error: any) {
    // Handle errors gracefully and log relevant information.
    componentError(error);
  }
};
