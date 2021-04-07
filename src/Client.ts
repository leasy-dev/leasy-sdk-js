import { GraphQLClient } from 'graphql-request';
import { createPaginatedQuery, createVariablelessPaginatedQuery } from './createPaginatedQuery';
import { AssetsScope } from './entities/asset';
import { CategoriesScope } from './entities/category';
import { ModelsScope } from './entities/model';
import { reservationActionCreator, ReservationsScope } from './entities/reservation';
import { TimeSlot, TimeSlotsScope } from './entities/timeSlot';
import { NotFoundError } from './errors';
import {
  AssetFragment,
  getSdk,
  ModelFragment,
  Sdk,
  TimeSlotFilter,
} from './generated/graphql-operations';

const DEFAULT_ENDPOINT = 'https://api.beta.leasy.dev/graphql';
const SDK_VERSION = '0.0.1';

export type ClientOptions = {
  apiKey: string;
  endpoint?: string;
};

export default class Client {
  /** @internal */
  private client: GraphQLClient;
  /** @internal */
  private sdk: Sdk;

  /** All operations available for categories */
  public categories: CategoriesScope;
  /** All operations available for models */
  public models: ModelsScope;
  /** All operations available for assets */
  public assets: AssetsScope;
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

    this.categories = {
      get: (id: string) =>
        this.sdk.SingleCategory({ id }).then(result => {
          if (result.category) {
            return result.category;
          }
          throw new NotFoundError();
        }),
      all: createVariablelessPaginatedQuery(
        this.sdk.AllCategories,
        result => result.organisation.categories,
      ),
    };
    this.models = {
      get: (id: string) =>
        this.sdk.SingleModel({ id }).then(result => {
          if (result.model) {
            return result.model;
          }
          throw new NotFoundError();
        }),
      all: createVariablelessPaginatedQuery(
        this.sdk.AllModels,
        result => result.organisation?.models,
      ),
      byCategory: createPaginatedQuery<ModelFragment, { categoryId: string }>(
        this.sdk.ModelsByCategory,
        result => result.category?.models,
      ),
    };
    this.assets = {
      get: (id: string) =>
        this.sdk.SingleAsset({ id }).then(result => {
          if (result.asset) {
            return result.asset;
          }
          throw new NotFoundError();
        }),
      all: createVariablelessPaginatedQuery(
        this.sdk.AllModels,
        result => result.organisation?.models,
      ),
      byModel: createPaginatedQuery<AssetFragment, { modelId: string }>(
        this.sdk.AssetsByModel,
        result => result.model?.assets,
      ),
    };
    this.timeSlots = {
      byModel: createPaginatedQuery<TimeSlot, { modelId: string; filter?: TimeSlotFilter | null }>(
        this.sdk.TimeSlotsByModel,
        result => result.model?.slots,
      ),
    };
    this.reservations = {
      get: (id: string) =>
        this.sdk.SingleReservation({ id }).then(result => {
          if (result.reservation) {
            return result.reservation;
          }
          throw new NotFoundError();
        }),
      create: draft =>
        this.sdk.CreateReservation({ draft }).then(result => {
          if (result.createReservation.reservation) {
            return result.createReservation.reservation;
          }
          throw new Error(
            'Some error(s) ocurred while creating a reservation:\n\n' +
              joinErrors(result.createReservation.errors),
          );
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
            return result.updateReservation.reservation;
          }
          throw new Error('Some error ocurred while updating a reservation.');
        });
      },
    };
  }
}

function joinErrors(errors: ReadonlyArray<{ __typename: string; message: string }>) {
  return errors.map(error => error.__typename + ':\n' + error.message).join('\n\n');
}
