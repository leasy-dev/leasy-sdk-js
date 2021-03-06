import {
  ReservationDraft,
  BookingFragment as Booking,
  ReservationAction as ReservationActionObject,
} from '../generated/graphql-operations';
import { UpdateFn } from '../types';

export { Booking };

export type Reservation = {
  __typename: 'Reservation';
  id: string;
  expiresAt?: string | null | undefined;
  completedAt?: string | null | undefined;
  bookings: Booking[];
};

export type ReservationsScope = {
  /**
   * Load a single resource using its uniquely identifying ID.
   * @param id The ID of the resource to load
   * @throws {@link NotFoundError} if the resource was not found, this will throw a not found error
   */
  get(id: string): Promise<Reservation>;
  /**
   * Create a new reservation for a specified model.
   * @param draft Input seed data to create a reservation
   */
  create(draft: ReservationDraft): Promise<Reservation>;
  /**
   * Update a reservation. There are various possible actions available which can be discovered
   * via autocomplete. The function also accepts the convenient action creator consumer function,
   * that allows you to call methods on the action creator:
   *
   * ```ts
   * await leasy.reservation.update("xxxx-xxxx-xxxx-xxxx", reservation => [
   *   reservation.complete()
   * ]);
   * ```
   *
   * @param id The unique identifier of the reservation, that you want to update
   * @param actions A single action, an array of actions or action creator consumer function
   */
  update: UpdateFn<ReservationAction, ReservationActionCreator, Reservation>;
  /**
   * Cancel a pending reservation and free all the resources that are booked by the reservation.
   * @param id The unique identifier of the reservation that you want to cancel/delete
   */
  delete(id: string): Promise<void>;
};

export type ReservationAction = Pick<ReservationActionObject, 'complete'>;

export type ReservationActionCreator = {
  /**
   * Complete a reservation, making it permanent. Reservations expire after some time, if they are
   * not completed
   */
  complete(): ReservationAction;
};

export const reservationActionCreator: ReservationActionCreator = {
  complete() {
    return { complete: {} };
  },
};
