import { GraphQLClient } from 'graphql-request';
import { createPaginatedQuery, createVariablelessPaginatedQuery } from './createPaginatedQuery';
import { ResourcesScope } from './entities/resource';
import { CalendarsScope } from './entities/calendar';
import { Reservation, reservationActionCreator, ReservationsScope } from './entities/reservation';
import { TimeSlot, TimeSlotsScope } from './entities/timeSlot';
import { mapErrorsFromGraphQL, NotFoundError } from './errors';
import { getSdk, Sdk, TimeSlotFilter } from './generated/graphql-operations';

const DEFAULT_ENDPOINT = 'https://api.beta.leasy.dev/graphql';
const SDK_VERSION = '0.0.3';

export type ClientOptions = {
  apiKey: string;
  endpoint?: string;
};

export default class Client {
  /** @internal */
  private client: GraphQLClient;
  /** @internal */
  private sdk: Sdk;

  /** All operations available for calendars */
  public calendars: CalendarsScope;
  /** All operations available for assets */
  public resources: ResourcesScope;
  /** All operations available for timeSlots */
  public timeSlots: TimeSlotsScope;
  /** All operations available for reservations */
  public reservations: ReservationsScope;

  constructor(options: ClientOptions) {
    const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
    this.client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${options.apiKey}`,
        'X-Leasy-SDK-Version': SDK_VERSION,
      },
    });
    this.sdk = getSdk(this.client);

    this.calendars = {
      get: (id: string) =>
        this.sdk.SingleCalendar({ id }).then(result => {
          if (result.calendar) {
            return result.calendar;
          }
          throw new NotFoundError();
        }),
      all: createVariablelessPaginatedQuery(
        this.sdk.AllCalendars,
        result => result.organisation?.models,
      ),
    };
    this.resources = {
      get: (id: string) =>
        this.sdk.SingleResource({ id }).then(result => {
          if (result.resource) {
            return result.resource;
          }
          throw new NotFoundError();
        }),
      all: createVariablelessPaginatedQuery(
        this.sdk.AllResources,
        result => result.organisation?.models,
      ),
    };
    this.timeSlots = {
      byResource: createPaginatedQuery<
        TimeSlot,
        { resourceId: string; filter?: TimeSlotFilter | null }
      >(this.sdk.TimeSlotsByResource, result => result.resource?.slots),
    };
    this.reservations = {
      get: (id: string): Promise<Reservation> =>
        this.sdk.SingleReservation({ id }).then(result => {
          if (result.reservation) {
            return {
              ...result.reservation,
              bookings: connectionToArray(result.reservation.bookings),
            };
          }
          throw new NotFoundError();
        }),
      create: draft =>
        this.sdk.CreateReservation({ draft }).then(result => {
          if (result.createReservation.reservation) {
            return {
              ...result.createReservation.reservation,
              bookings: connectionToArray(result.createReservation.reservation.bookings),
            };
          }
          throw mapErrorsFromGraphQL(result.createReservation.errors)[0];
        }),
      update: (id, actionCreator) => {
        let actions;
        if (typeof actionCreator === 'function') {
          actions = actionCreator(reservationActionCreator);
        } else {
          actions = actionCreator;
        }
        return this.sdk.UpdateReservation({ id, actions }).then(result => {
          if (result.updateReservation.reservation) {
            return {
              ...result.updateReservation.reservation,
              bookings: connectionToArray(result.updateReservation.reservation.bookings),
            };
          }
          throw mapErrorsFromGraphQL(result.updateReservation.errors)[0];
        });
      },
      delete: id => {
        return this.sdk.DeleteReservation({ id }).then(result => {
          if (!result.deleteReservation.success) {
            throw mapErrorsFromGraphQL(result.deleteReservation.errors)[0];
          }
        });
      },
    };
  }
}

function connectionToArray<T>(connection: {
  edges?: ({ node?: T | null | undefined } | null | undefined)[] | null | undefined;
}): T[] {
  const result: T[] = [];
  for (let i = 0; connection.edges && i < connection.edges.length; i++) {
    const node = connection.edges[i]?.node;
    if (node !== null && typeof node !== 'undefined') {
      result.push(node);
    }
  }
  return result;
}
