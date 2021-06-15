export { default as Client } from './Client';

export {
  NotFoundError,
  UserErrorUnion,
  UserError,
  ValidationError,
  IllegalActionError,
  DataInconsistencyError,
} from './errors';

// Relevant type definitions
export { Resource, ResourcesScope } from './entities/resource';
export { Reservation, ReservationsScope } from './entities/reservation';
export { TimeSlot, TimeSlotsScope } from './entities/timeSlot';
