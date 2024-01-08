import { eventMap } from "@core/utils";

export const componentEventMapper = (): void => {
  eventMap.forEach(
    async (event: () => Promise<void>): Promise<void> => await event()
  );
}