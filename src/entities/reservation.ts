import { ReservationAction } from '../generated/graphql-operations';

type ReservationActionCreatorType = {
  complete(): ReservationAction;
};

export const reservationActionCreator: ReservationActionCreatorType = {
  complete() {
    return { complete: {} };
  },
};
