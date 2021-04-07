import { PaginatedQuery } from '../createPaginatedQuery';
import { TimeSlotFragment as TimeSlot, TimeSlotFilter } from '../generated/graphql-operations';

export { TimeSlot };

export type TimeSlotsScope = {
  byModel: PaginatedQuery<TimeSlot, { modelId: string; filter?: Partial<TimeSlotFilter> }>;
};
