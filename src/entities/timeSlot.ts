import { PaginatedQuery } from '../createPaginatedQuery';
import { TimeSlotFragment as TimeSlot, TimeSlotFilter } from '../generated/graphql-operations';

export { TimeSlot };

export type TimeSlotsScope = {
  byResource: PaginatedQuery<TimeSlot, { resourceId: string; filter?: Partial<TimeSlotFilter> }>;
};
