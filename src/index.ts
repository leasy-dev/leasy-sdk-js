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
export { Asset, AssetsScope } from './entities/asset';
export { Category, CategoriesScope } from './entities/category';
export { Model, ModelsScope } from './entities/model';
export { Reservation, ReservationsScope, ReservationAction } from './entities/reservation';
export { TimeSlot, TimeSlotsScope } from './entities/timeSlot';
