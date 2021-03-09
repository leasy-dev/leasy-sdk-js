import { GraphQLClient } from 'graphql-request';
import {
  createPaginatedQuery,
  createVariablelessPaginatedQuery,
  PaginatedQuery,
  VariablelessPaginatedQuery,
} from './createPaginatedQuery';
import { NotFoundError } from './errors';
import {
  AssetFragment,
  CategoryFragment,
  getSdk,
  ModelFragment,
  ReservationAction as ReservationActionObject,
  ReservationDraft,
  ReservationFragment,
  Sdk,
  TimeSlotFilter,
  TimeSlotFragment,
} from './generated/graphql-operations';

const DEFAULT_ENDPOINT = 'https://api.beta.leasy.dev/graphql';

export type ClientOptions = {
  apiKey: string;
  endpoint?: string;
};

export default class Client {
  private client: GraphQLClient;
  private sdk: Sdk;

  public categories: CategoriesScope;
  public models: ModelsScope;
  public assets: AssetsScope;
  public timeSlots: TimeSlotsScope;
  public reservations: ReservationScope;

  constructor(options: ClientOptions) {
    const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
    this.client = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${options.apiKey}`,
        'X-Leasy-SDK-Version': '0.0.1',
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
      byModel: createPaginatedQuery<
        TimeSlotFragment,
        { modelId: string; filter?: TimeSlotFilter | null }
      >(this.sdk.TimeSlotsByModel, result => result.model?.slots),
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
          throw new Error('Some error ocurred while creating a reservation.');
        }),
      update: (id, actionCreator) => {
        let actions;
        if (typeof actionCreator === 'function') {
          actions = actionCreator({
            complete: () => ({ complete: {} }),
          });
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

export type CategoriesScope = {
  /**
   * Load a single category using its uniquely identifying ID.
   * @param id The ID of the category to load
   * @throws {NotFoundError} if the category was not found, this will throw a not found error
   */
  get(id: string): Promise<CategoryFragment>;
  /**
   * Load all categories in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<CategoryFragment>;
};

export type ModelsScope = {
  /**
   * Load a single model using its uniquely identifying ID.
   * @param id The ID of the model to load
   * @throws {NotFoundError} if the model was not found, this will throw a not found error
   */
  get(id: string): Promise<ModelFragment>;
  /**
   * Load all categories in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<ModelFragment>;
  /**
   * Load all models that belong to a specified category.
   * @param categoryId The ID of the category
   * @throws {NotFoundError} if the category was not found, this will throw a not found error
   */
  byCategory: PaginatedQuery<ModelFragment, { categoryId: string }>;
};

export type AssetsScope = {
  /**
   * Load a single asset using its uniquely identifying ID.
   * @param id The ID of the asset to load
   * @throws {NotFoundError} if the asset was not found, this will throw a not found error
   */
  get(id: string): Promise<AssetFragment>;
  /**
   * Load all assets in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<AssetFragment>;
  /**
   * Load all assets that belong to a specified model.
   * @param modelId The ID of the model
   * @throws {NotFoundError} if the model was not found, this will throw a not found error
   */
  byModel: PaginatedQuery<AssetFragment, { modelId: string }>;
};

type ReservationAction =
  | Pick<ReservationActionObject, 'complete'>
  | Pick<ReservationActionObject, 'abort'>;

type ReservationActionCreator = {
  /**
   * Complete a reservation, making it permanent. Reservations expire after some time, if they are
   * not completed
   */
  complete(): ReservationAction;
  /**
   * Abort a reservation, freeing the resources in the reservation. Reservations expire
   * automatically after some time, but sometimes we can make them available ealier.
   */
  complete(): ReservationAction;
};

type UpdateFn<TAction, TActionCreator, TResult> = (
  /** The ID of the resouce to update. */
  id: string,
  /** Pass actions directly or  */
  actions: TAction | TAction[] | ((creator: TActionCreator) => TAction | TAction[]),
) => Promise<TResult>;

export type ReservationScope = {
  /**
   * Load a single resource using its uniquely identifying ID.
   * @param id The ID of the resource to load
   * @throws {NotFoundError} if the resource was not found, this will throw a not found error
   */
  get(id: string): Promise<ReservationFragment>;
  /**
   * Create a new reservation for a specified model.
   * @param draft Input seed data to create a reservation
   */
  create(draft: ReservationDraft): Promise<ReservationFragment>;
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
  update: UpdateFn<ReservationAction, ReservationActionCreator, ReservationFragment>;
};

export type TimeSlotsScope = {
  byModel: PaginatedQuery<TimeSlotFragment, { modelId: string; filter?: Partial<TimeSlotFilter> }>;
};
