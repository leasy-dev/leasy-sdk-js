import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: string;
  /** Empty payload scalar for actions without payloads. */
  EmptyPayload: {};
};

/** This error is thrown when the user tries to mutate an object that cannot be mutated e.g. when the object was deleted in the meantime but was still available in the UI. */
export type IllegalActionError = UserError & {
  __typename: 'IllegalActionError';
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
};

/** An error that occurred during the execution that should be displayed in the frontend. */
export type UserError = {
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
};

/** This error is thrown when the users supplied a value that does not fullfill the validation rules for a field. */
export type ValidationError = UserError & {
  __typename: 'ValidationError';
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
  /** Indicates the parameter, argument, or field that failed validation. */
  field: Scalars['String'];
  /** This is a hint that could help the user fill out the field. */
  hint?: Maybe<Scalars['String']>;
};

/** This error is thrown when the user attemts an illegal action. Sometimes an action cannot be done while the data is in a certain state. In this case an IlligalActionError is returned. */
export type DataInconsistencyError = UserError & {
  __typename: 'DataInconsistencyError';
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
};

/** The root query type. */
export type Query = {
  __typename: 'Query';
  /** Viewer namespace for all queries dependend on the viewer context. */
  viewer?: Maybe<Viewer>;
  /**
   * Query a single organisation based on it's id.
   * Most authentication tokens can only read the organisation that they were made for.
   * In this case you can ommit the id parameter:
   * ```graphql
   * { organisation { id } }
   * ```
   */
  organisation?: Maybe<Organisation>;
  /** Query a single model based on its id. */
  model?: Maybe<Model>;
  /** Query a single asset based on its id. */
  asset?: Maybe<Asset>;
  /** Get a single category by it's unique ID. */
  category?: Maybe<Category>;
  /** Get a single availability by it's unique ID. */
  availability?: Maybe<Availability>;
  /** Get a single reservation by it's unique ID. */
  reservation?: Maybe<Reservation>;
  /** List of all API key permission levels with information about their access rights. */
  apiKeyPermissionInfos: Array<ApiKeyPermissionLevelInfo>;
};


/** The root query type. */
export type QueryOrganisationArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** The root query type. */
export type QueryModelArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryAssetArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryAvailabilityArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryReservationArgs = {
  id: Scalars['ID'];
};

/**
 * The viewer object is a namespace for everything that is specific to the user making the API
 * request.
 */
export type Viewer = {
  __typename: 'Viewer';
  /** List of all organisations that this user can access. */
  organisations: OrganisationConnection;
  /** The account of the current viewer. */
  account?: Maybe<Account>;
};


/**
 * The viewer object is a namespace for everything that is specific to the user making the API
 * request.
 */
export type ViewerOrganisationsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type OrganisationConnection = {
  __typename: 'OrganisationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OrganisationEdge>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type OrganisationEdge = {
  __typename: 'OrganisationEdge';
  /** The item at the end of the edge */
  node?: Maybe<Organisation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type Organisation = {
  __typename: 'Organisation';
  /** A unique identifier for this organisation. */
  id: Scalars['ID'];
  /** The name of this organisation. */
  denomination: Scalars['String'];
  /** List of all categories defined within this organisation. */
  categories: CategoryConnection;
  /** Return a list of all models in this organisation. */
  models: ModelConnection;
  /** List of all assets available in this organisation. */
  assets: AssetConnection;
  /** Returns all availabilities that are registered for this organisation. */
  availabilities: AvailabilityConnection;
  /** Returns all reservations within an organisation. */
  reservations: ReservationConnection;
  /** List of all API keys of this organisation. */
  apiKeys: ApiKeyConnection;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationModelsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationAssetsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationAvailabilitiesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationReservationsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationApiKeysArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename: 'CategoryConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategoryEdge>>>;
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename: 'CategoryEdge';
  /** The item at the end of the edge */
  node?: Maybe<Category>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * A category marks the highest level in the object hierarchie. It defines which properties the
 * models have. A car rental company might rent cars and scooters. Since these categories are so
 * different, they would be displayed differently to the end user with different properties that
 * differentiate the offered models.
 */
export type Category = {
  __typename: 'Category';
  /** A unique identifier for this category. */
  id: Scalars['ID'];
  /** The name for this category. */
  denomination: Scalars['ID'];
  /** The models that implement this category. */
  models: ModelConnection;
};


/**
 * A category marks the highest level in the object hierarchie. It defines which properties the
 * models have. A car rental company might rent cars and scooters. Since these categories are so
 * different, they would be displayed differently to the end user with different properties that
 * differentiate the offered models.
 */
export type CategoryModelsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type ModelConnection = {
  __typename: 'ModelConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
};

/** An edge in a connection. */
export type ModelEdge = {
  __typename: 'ModelEdge';
  /** The item at the end of the edge */
  node?: Maybe<Model>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * A model is used to group multiple assets that have the same or very similar properties.
 * Models contain the data that is primarily shown to the customer.
 */
export type Model = {
  __typename: 'Model';
  /** A unique identifier for this model. */
  id: Scalars['ID'];
  /** The name of this model. */
  denomination: Scalars['String'];
  /** This model's category. */
  category?: Maybe<Category>;
  /** Returns all the assets that are derived from this  */
  assets: AssetConnection;
  /** Returns a list of schedules that are set for this model. */
  schedules: ScheduleConnection;
  /** Show all the slots that are available */
  slots: TimeSlotConnection;
};


/**
 * A model is used to group multiple assets that have the same or very similar properties.
 * Models contain the data that is primarily shown to the customer.
 */
export type ModelAssetsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * A model is used to group multiple assets that have the same or very similar properties.
 * Models contain the data that is primarily shown to the customer.
 */
export type ModelSchedulesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};


/**
 * A model is used to group multiple assets that have the same or very similar properties.
 * Models contain the data that is primarily shown to the customer.
 */
export type ModelSlotsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  filter?: Maybe<TimeSlotFilter>;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename: 'AssetConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AssetEdge>>>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename: 'AssetEdge';
  /** The item at the end of the edge */
  node?: Maybe<Asset>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * An asset is a single sharable resource that belongs to the organisation. Since assets in a
 * sharing business don't leave the inventory of the business, the asset needs to be tracked and
 * managed over time.
 */
export type Asset = {
  __typename: 'Asset';
  /** A unique identifier for this asset. */
  id: Scalars['ID'];
  /** The name of this asset. */
  denomination: Scalars['String'];
  /** The model of this asset. */
  model: Model;
};

/** A connection to a list of items. */
export type ScheduleConnection = {
  __typename: 'ScheduleConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ScheduleEdge>>>;
};

/** An edge in a connection. */
export type ScheduleEdge = {
  __typename: 'ScheduleEdge';
  /** The item at the end of the edge */
  node?: Maybe<Schedule>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A schedule describes when and how slots for a specific resource are available. */
export type Schedule = {
  __typename: 'Schedule';
  /** A unique identifier for this schedule. */
  id: Scalars['ID'];
  /** The first day that this schedule is valid. */
  validFrom: Scalars['DateTime'];
  /** The first day that this schedule is valid. */
  validUntil?: Maybe<Scalars['DateTime']>;
  /** The booking mode describes in which way bookings are being made. */
  bookingMode: BookingMode;
  /** Describes timeframes on certain days and times of the day accross a week. */
  availability: Availability;
};


/** Times within an availability can be booked with different booking modes. */
export type BookingMode =
  /** In the `BLOCK` booking mode, bookings always span the whole availability section. */
  | 'BLOCK'
  /** This booking mode allows bookings of arbitrary length as long as the slot is within the business hours of the availability. This mode is great when you want to encode the booking logic onto some backend logic and allow your backend to make bookings as it wants. */
  | 'FREE';

/** Availabilities are used to define business hours or generally time frames in which certain assets are available. */
export type Availability = {
  __typename: 'Availability';
  /** A unique identifier for this availability. */
  id: Scalars['ID'];
  /** The name of this availability. Useful to identify it in the UI. */
  denomination?: Maybe<Scalars['String']>;
  /** Schedule rules describe the avaiability of a schedule. */
  rules: AvailabilityRuleConnection;
};


/** Availabilities are used to define business hours or generally time frames in which certain assets are available. */
export type AvailabilityRulesArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type AvailabilityRuleConnection = {
  __typename: 'AvailabilityRuleConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AvailabilityRuleEdge>>>;
};

/** An edge in a connection. */
export type AvailabilityRuleEdge = {
  __typename: 'AvailabilityRuleEdge';
  /** The item at the end of the edge */
  node?: Maybe<AvailabilityRule>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * A schedule rule describes a time span on certain days.
 * Multiple schedule rules can form complex time tables.
 */
export type AvailabilityRule = {
  __typename: 'AvailabilityRule';
  /** List of weekdays that have the time slots of this rule. */
  weekdays: Array<Weekday>;
  /** When do the slots of this rule start? */
  startTime: Scalars['LocalTime'];
  /** When do the slots of this rule end? */
  endTime: Scalars['LocalTime'];
  /** Should the slots not be available on holidays? */
  excludeHolidays: Scalars['Boolean'];
};

export type Weekday =
  /** An enum value to represent Monday. */
  | 'MONDAY'
  /** An enum value to represent Tuesday. */
  | 'TUESDAY'
  /** An enum value to represent Wednesday. */
  | 'WEDNESDAY'
  /** An enum value to represent Thursday. */
  | 'THURSDAY'
  /** An enum value to represent Friday. */
  | 'FRIDAY'
  /** An enum value to represent Saturday. */
  | 'SATURDAY'
  /** An enum value to represent Sunday. */
  | 'SUNDAY';


/** A connection to a list of items. */
export type TimeSlotConnection = {
  __typename: 'TimeSlotConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TimeSlotEdge>>>;
};

/** An edge in a connection. */
export type TimeSlotEdge = {
  __typename: 'TimeSlotEdge';
  /** The item at the end of the edge */
  node?: Maybe<TimeSlot>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A time slot is a time inside of a time table that can be booked. */
export type TimeSlot = {
  __typename: 'TimeSlot';
  /** The starting time for this slot. */
  startTime: Scalars['DateTime'];
  /** Then end time for this slot. */
  endTime: Scalars['DateTime'];
  /** Is this time slot available for booking? */
  available?: Maybe<Scalars['Boolean']>;
  /** Returns the amount of assets available. */
  availableAssetsCount?: Maybe<Scalars['Int']>;
};

/** A filter for filtering a list of time slots. */
export type TimeSlotFilter = {
  /** From which point in time onwards should slots be returned? */
  after?: Maybe<Scalars['DateTime']>;
  /** Before which point in time should slots be returned? */
  before?: Maybe<Scalars['DateTime']>;
};

/** A connection to a list of items. */
export type AvailabilityConnection = {
  __typename: 'AvailabilityConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AvailabilityEdge>>>;
};

/** An edge in a connection. */
export type AvailabilityEdge = {
  __typename: 'AvailabilityEdge';
  /** The item at the end of the edge */
  node?: Maybe<Availability>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A connection to a list of items. */
export type ReservationConnection = {
  __typename: 'ReservationConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReservationEdge>>>;
};

/** An edge in a connection. */
export type ReservationEdge = {
  __typename: 'ReservationEdge';
  /** The item at the end of the edge */
  node?: Maybe<Reservation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A reservation for an asset. */
export type Reservation = {
  __typename: 'Reservation';
  /** A unique identifier for this reservation. */
  id: Scalars['ID'];
  /** This reservation was made for a model and . */
  asset?: Maybe<Asset>;
  /** The reservation was made for a specific model. */
  model?: Maybe<Model>;
  /** The time when this reservation was completed. */
  completedAt?: Maybe<Scalars['DateTime']>;
  /** The point in time where this reservation starts */
  startTime: Scalars['DateTime'];
  /** The point in time where this reservation ends */
  endTime: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type ApiKeyConnection = {
  __typename: 'ApiKeyConnection';
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ApiKeyEdge>>>;
};

/** An edge in a connection. */
export type ApiKeyEdge = {
  __typename: 'ApiKeyEdge';
  /** The item at the end of the edge */
  node?: Maybe<ApiKey>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An API key used to connect to the API */
export type ApiKey = {
  __typename: 'ApiKey';
  /** A unique identifier for this API key. */
  id: Scalars['ID'];
  /** A short description for this API key to remember where it is used. */
  description?: Maybe<Scalars['String']>;
  /** Information about this key's permission level. */
  level?: Maybe<ApiKeyPermissionLevelInfo>;
  /** This is the actual key you will use to authenticated your application. This string is only return when creating a new API key. Afterwards, this field always returns null for a key. */
  key?: Maybe<Scalars['String']>;
};

/** Detailed information about an API key permission level. */
export type ApiKeyPermissionLevelInfo = {
  __typename: 'ApiKeyPermissionLevelInfo';
  /** The enum value that represents this permission level. */
  enum: ApiKeyPermissionLevel;
  /** A text that describes the access level of a particular permission level. */
  description?: Maybe<Scalars['String']>;
  /** Checks weather the current permission level allows creating a key with this permission level. */
  canCreate: Scalars['Boolean'];
};

/** Api keys can have different levels */
export type ApiKeyPermissionLevel =
  /** Basic read operations that are safe to do from a browser client. */
  | 'READ'
  /** This permission level allows making bookings. */
  | 'WRITE'
  /** With this permission you can take full control over the whole organization structure, change bookings, and automate asset management. */
  | 'ADMIN'
  /** This powerful token allows you to take full control over your account. If you need this type of token, please contact our support to discuss you use case. */
  | 'SUPERADMIN';

/** Each user has an account associated with them. */
export type Account = {
  __typename: 'Account';
  /** A unique identifier for this account. */
  id: Scalars['ID'];
  /** The email address associated with this account. */
  email: Scalars['ID'];
  /** The name of the owner of this account. Might be null, if no name is set (yet). */
  name?: Maybe<Scalars['String']>;
};

/** The root mutation type */
export type Mutation = {
  __typename: 'Mutation';
  /** Create a new organisation for the currently viewing user. */
  createOrganisation: CreateOrganisationResult;
  /** Update an organisation. */
  updateOrganisation: UpdateOrganisationResult;
  /** (Soft) delete an organisation. */
  deleteOrganisation: DeleteMutationResult;
  /** Create a new category. */
  createCategory: CreateCategoryResult;
  updateCategory: UpdateCategoryResult;
  /** (Soft) delete a category. */
  deleteCategory: DeleteMutationResult;
  /** Create a new model. */
  createModel: CreateModelResult;
  /** Update an existing model. */
  updateModel: UpdateModelResult;
  /** (Soft) delete a model. */
  deleteModel: DeleteMutationResult;
  /** Create a new asset of a specific model. */
  createAsset: CreateAssetResult;
  updateAccount: UpdateAccountResult;
  /** Create a new schedule by supplying a set of rules. */
  createAvailability: CreateAvailabilityResult;
  /** Update some properties of a schedule. Most properties of a schedule are immutable and should not be changed. This prevents bookings in the past to become invalid. If you want to change the other properties of a schedule, create a new schedule instead. */
  updateSchedule: UpdateScheduleResult;
  createReservation: CreateReservationResult;
  /** Update a reservation. */
  updateReservation: UpdateReservationResult;
  createApiKey: CreateApiKeyResult;
  /**
   * Revoke an API key making it invalid for further usage.
   * This cannot be undone and the key will no longer show up in Leasy cloud.
   * The key will stay in the database to keep track of changes that were made with this key.
   */
  deleteApiKey: DeleteMutationResult;
};


/** The root mutation type */
export type MutationCreateOrganisationArgs = {
  draft: OrganisationDraft;
};


/** The root mutation type */
export type MutationUpdateOrganisationArgs = {
  id: Scalars['ID'];
  actions: Array<OrganisationAction>;
};


/** The root mutation type */
export type MutationDeleteOrganisationArgs = {
  id: Scalars['ID'];
};


/** The root mutation type */
export type MutationCreateCategoryArgs = {
  draft: CategoryDraft;
};


/** The root mutation type */
export type MutationUpdateCategoryArgs = {
  id: Scalars['ID'];
  actions: Array<CategoryAction>;
};


/** The root mutation type */
export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};


/** The root mutation type */
export type MutationCreateModelArgs = {
  draft: ModelDraft;
};


/** The root mutation type */
export type MutationUpdateModelArgs = {
  id: Scalars['ID'];
  actions: Array<ModelAction>;
};


/** The root mutation type */
export type MutationDeleteModelArgs = {
  id: Scalars['ID'];
};


/** The root mutation type */
export type MutationCreateAssetArgs = {
  draft: AssetDraft;
};


/** The root mutation type */
export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  actions: Array<AccountAction>;
};


/** The root mutation type */
export type MutationCreateAvailabilityArgs = {
  draft: AvailabilityDraft;
};


/** The root mutation type */
export type MutationUpdateScheduleArgs = {
  id: Scalars['ID'];
  actions: Array<ScheduleAction>;
};


/** The root mutation type */
export type MutationCreateReservationArgs = {
  draft: ReservationDraft;
};


/** The root mutation type */
export type MutationUpdateReservationArgs = {
  id: Scalars['ID'];
  actions: Array<ReservationAction>;
};


/** The root mutation type */
export type MutationCreateApiKeyArgs = {
  draft: ApiKeyDraft;
};


/** The root mutation type */
export type MutationDeleteApiKeyArgs = {
  id: Scalars['ID'];
};

/** Mutation result of the _createOrganisation_ mutation. */
export type CreateOrganisationResult = {
  __typename: 'CreateOrganisationResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  organisation?: Maybe<Organisation>;
};

/** Draft entity that contains all fields for the creation. */
export type OrganisationDraft = {
  /** Name for the new organisation */
  denomination: Scalars['String'];
};

/** Mutation result of the _updateOrganisation_ mutation. */
export type UpdateOrganisationResult = {
  __typename: 'UpdateOrganisationResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** The updated version of the organisation if all the actions were successful. */
  organisation?: Maybe<Organisation>;
};

/** Input type that holds all available actions on the _Organisation_ type. */
export type OrganisationAction = {
  /** Update the name of this organisation. */
  setDenomination?: Maybe<OrganisationSetDenomination>;
};

/** Arguments needed for the _SetDenomination_ action. */
export type OrganisationSetDenomination = {
  /** The new name for this organisation. */
  denomination: Scalars['String'];
};

/** Generic result created by any delete mutation. */
export type DeleteMutationResult = {
  __typename: 'DeleteMutationResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
};

/** Mutation result of the _createCategory_ mutation. */
export type CreateCategoryResult = {
  __typename: 'CreateCategoryResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  category?: Maybe<Category>;
};

/** Draft entity that contains all fields for the creation. */
export type CategoryDraft = {
  /** The id of the organisation that this category should be created for. */
  organisationId: Scalars['ID'];
  /** The name for the new category. */
  denomination: Scalars['String'];
};

/** Mutation result of the _updateCategory_ mutation. */
export type UpdateCategoryResult = {
  __typename: 'UpdateCategoryResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** Returns the category if it can be found by the provided ID. */
  category?: Maybe<Category>;
};

/** Input type that holds all available actions on the _Category_ type. */
export type CategoryAction = {
  /** Set the denomination of this category to a new value. */
  setDenomination?: Maybe<CategorySetDenomination>;
};

/** Arguments needed for the _SetDenomination_ action. */
export type CategorySetDenomination = {
  /** The new name for this denomination. */
  denomination: Scalars['String'];
};

/** Mutation result of the _createModel_ mutation. */
export type CreateModelResult = {
  __typename: 'CreateModelResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  model?: Maybe<Model>;
};

/** Draft entity that contains all fields for the creation. */
export type ModelDraft = {
  /** The id of the organisation that this category should be created for. */
  categoryId: Scalars['ID'];
  /** The name for the new category. */
  denomination: Scalars['String'];
};

/** Mutation result of the _updateModel_ mutation. */
export type UpdateModelResult = {
  __typename: 'UpdateModelResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** If the update was successful, the updated model is returned from this field. */
  model?: Maybe<Model>;
};

/** Input type that holds all available actions on the _Model_ type. */
export type ModelAction = {
  /** Set the description to this new value. */
  setDenomination?: Maybe<ModelSetDenomination>;
  /**
   * Set a new schedule for this model starting at `validFrom`.
   * If no value is provided for `validFrom` uses the current point in time.
   */
  addSchedule?: Maybe<ModelAddSchedule>;
};

/** Arguments needed for the _SetDenomination_ action. */
export type ModelSetDenomination = {
  /** The new denomination value */
  denomination: Scalars['String'];
};

/** Arguments needed for the _AddSchedule_ action. */
export type ModelAddSchedule = {
  /** Defines the start of the validity span of this schedule. If no value is provided, uses the current date. */
  validFrom?: Maybe<Scalars['DateTime']>;
  /** Defines the end of the validity span of this schedule. If no value is provided, the validity span becomes open ended. This is useful if there is currently no intent of using a different schedule anytime soon. */
  validUntil?: Maybe<Scalars['DateTime']>;
  /** The ID of the availability that should be used for this schedule. */
  availabilityId: Scalars['ID'];
  /** This is the booking mode for this schedule. */
  bookingMode: BookingMode;
};

/** Mutation result of the _createAsset_ mutation. */
export type CreateAssetResult = {
  __typename: 'CreateAssetResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  asset?: Maybe<Asset>;
};

/** Draft entity that contains all fields for the creation. */
export type AssetDraft = {
  /** This is the name of the asset that will be displayed in the UI and potentially to your end-users. */
  denomination: Scalars['String'];
  /** The ID of the model for this asset. */
  modelId: Scalars['ID'];
};

/** Mutation result of the _updateAccount_ mutation. */
export type UpdateAccountResult = {
  __typename: 'UpdateAccountResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** If the mutation was successfull, the updated account is returned here. */
  account?: Maybe<Account>;
};

/** Input type that holds all available actions on the _Account_ type. */
export type AccountAction = {
  /** Set the name of this account to a specific value. */
  setName?: Maybe<AccountSetName>;
  /** Set the name of this account to a specific value. */
  setEmail?: Maybe<AccountSetEmail>;
};

/** Arguments needed for the _SetName_ action. */
export type AccountSetName = {
  /** The new value for the user's name. */
  name: Scalars['String'];
};

/** Arguments needed for the _SetEmail_ action. */
export type AccountSetEmail = {
  /** The new value for the user's name. */
  name: Scalars['String'];
};

/** Mutation result of the _createAvailability_ mutation. */
export type CreateAvailabilityResult = {
  __typename: 'CreateAvailabilityResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  availability?: Maybe<Availability>;
};

/** Draft entity that contains all fields for the creation. */
export type AvailabilityDraft = {
  /** Specify an organisation that this availability should be associated with. If you don't specify an organisation, we will automatically derive it from your API key. */
  organisationId?: Maybe<Scalars['ID']>;
  /** The denomination can be used to better identify a schedule in the UI. */
  denomination?: Maybe<Scalars['String']>;
  /** List of rules describing a complex schedule. */
  rules: Array<AvailabilityRuleDraft>;
};

/** All the data needed to create a a new schedule draft. */
export type AvailabilityRuleDraft = {
  /** List of weekdays that have the time slots of this rule. */
  weekdays: Array<Weekday>;
  /** When do the slots of this rule start? */
  startTime: Scalars['LocalTime'];
  /** When do the slots of this rule end? */
  endTime: Scalars['LocalTime'];
  /** Should the slots not be available on holidays? */
  excludeHolidays: Scalars['Boolean'];
};

/** Mutation result of the _updateSchedule_ mutation. */
export type UpdateScheduleResult = {
  __typename: 'UpdateScheduleResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** If this mutation was successful, returns the updated schedule here. */
  schedule?: Maybe<Schedule>;
};

/** Input type that holds all available actions on the _Schedule_ type. */
export type ScheduleAction = {
  /**
   * Set the end date of a schedule.
   * After this date the schedule is no longer valid and a different schedule can be set for
   * a model.
   *
   * *Warning*: Bookings that have already been made in the future under this schedule stay
   * valid and might be "hanging", meaning not within a valid schedule. You will have to
   * resolve these bookings yourself.
   */
  setValidUntil?: Maybe<ScheduleSetValidUntil>;
};

/** Arguments needed for the _SetValidUntil_ action. */
export type ScheduleSetValidUntil = {
  /** The date at which this schedule should stop being valid. */
  validUntil: Scalars['DateTime'];
};

/** Mutation result of the _createReservation_ mutation. */
export type CreateReservationResult = {
  __typename: 'CreateReservationResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  reservation?: Maybe<Reservation>;
};

/** Draft entity that contains all fields for the creation. */
export type ReservationDraft = {
  /** The id of the model that this reservation should reserve. */
  modelId: Scalars['ID'];
  /** Start of the reservation. */
  start: Scalars['DateTime'];
  /** End of the reservation. */
  end: Scalars['DateTime'];
};

/** Mutation result of the _updateReservation_ mutation. */
export type UpdateReservationResult = {
  __typename: 'UpdateReservationResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** The updated reservation if the update was successful. */
  reservation?: Maybe<Reservation>;
};

/** Input type that holds all available actions on the _Reservation_ type. */
export type ReservationAction = {
  /** Cancel a reservation that has not yet been checked out. */
  abort?: Maybe<Scalars['EmptyPayload']>;
  /** Complete (checkout) a reservation making it permanent. Depending on the settings, some customer data has to be provided or a payment has to succeed. */
  complete?: Maybe<ReservationComplete>;
};


/** Arguments needed for the _Complete_ action. */
export type ReservationComplete = {
  /** If we have the customer already in our database, we can provide the customers' ID directly. */
  customerId?: Maybe<Scalars['ID']>;
};

/** Mutation result of the _createApiKey_ mutation. */
export type CreateApiKeyResult = {
  __typename: 'CreateApiKeyResult';
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  apiKey?: Maybe<ApiKey>;
};

/** Draft entity that contains all fields for the creation. */
export type ApiKeyDraft = {
  /** The id of the organisation that you want this token to have access to. */
  organisationId: Scalars['ID'];
  /** The desired permission level for this key. */
  permissionLevel: ApiKeyPermissionLevel;
  /** A short description for this API key to remember where it is used. */
  description: Scalars['String'];
};

export type CategoryFragment = { __typename: 'Category', id: string, denomination: string };

export type ModelFragment = { __typename: 'Model', id: string, denomination: string, category?: Maybe<(
    { __typename: 'Category' }
    & CategoryFragment
  )> };

export type AssetFragment = { __typename: 'Asset', id: string, denomination: string, model: { __typename: 'Model', id: string, denomination: string } };

export type TimeSlotFragment = { __typename: 'TimeSlot', startTime: string, endTime: string, available?: Maybe<boolean> };

export type ReservationFragment = { __typename: 'Reservation', id: string, startTime: string, endTime: string, completedAt?: Maybe<string>, model?: Maybe<{ __typename: 'Model', id: string, denomination: string }> };

export type PageInfoFieldsFragment = { __typename: 'PageInfo', hasNextPage: boolean, endCursor?: Maybe<string> };

export type AllCategoriesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AllCategoriesQuery = { __typename: 'Query', organisation?: Maybe<{ __typename: 'Organisation', categories: { __typename: 'CategoryConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges?: Maybe<Array<Maybe<{ __typename: 'CategoryEdge', node?: Maybe<(
          { __typename: 'Category' }
          & CategoryFragment
        )> }>>> } }> };

export type SingleCategoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleCategoryQuery = { __typename: 'Query', category?: Maybe<(
    { __typename: 'Category' }
    & CategoryFragment
  )> };

export type AllModelsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AllModelsQuery = { __typename: 'Query', organisation?: Maybe<{ __typename: 'Organisation', models: { __typename: 'ModelConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges?: Maybe<Array<Maybe<{ __typename: 'ModelEdge', node?: Maybe<(
          { __typename: 'Model' }
          & ModelFragment
        )> }>>> } }> };

export type ModelsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type ModelsByCategoryQuery = { __typename: 'Query', category?: Maybe<{ __typename: 'Category', models: { __typename: 'ModelConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ) } }> };

export type SingleModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleModelQuery = { __typename: 'Query', model?: Maybe<(
    { __typename: 'Model' }
    & ModelFragment
  )> };

export type AllAssetsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AllAssetsQuery = { __typename: 'Query', organisation?: Maybe<{ __typename: 'Organisation', assets: { __typename: 'AssetConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges?: Maybe<Array<Maybe<{ __typename: 'AssetEdge', node?: Maybe<(
          { __typename: 'Asset' }
          & AssetFragment
        )> }>>> } }> };

export type SingleAssetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleAssetQuery = { __typename: 'Query', asset?: Maybe<(
    { __typename: 'Asset' }
    & AssetFragment
  )> };

export type AssetsByModelQueryVariables = Exact<{
  modelId: Scalars['ID'];
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AssetsByModelQuery = { __typename: 'Query', model?: Maybe<{ __typename: 'Model', assets: { __typename: 'AssetConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges?: Maybe<Array<Maybe<{ __typename: 'AssetEdge', node?: Maybe<(
          { __typename: 'Asset' }
          & AssetFragment
        )> }>>> } }> };

export type TimeSlotsByModelQueryVariables = Exact<{
  modelId: Scalars['ID'];
  filter?: Maybe<TimeSlotFilter>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type TimeSlotsByModelQuery = { __typename: 'Query', model?: Maybe<{ __typename: 'Model', slots: { __typename: 'TimeSlotConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges?: Maybe<Array<Maybe<{ __typename: 'TimeSlotEdge', node?: Maybe<(
          { __typename: 'TimeSlot' }
          & TimeSlotFragment
        )> }>>> } }> };

export type SingleReservationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleReservationQuery = { __typename: 'Query', reservation?: Maybe<(
    { __typename: 'Reservation' }
    & ReservationFragment
  )> };

export type CreateReservationMutationVariables = Exact<{
  draft: ReservationDraft;
}>;


export type CreateReservationMutation = { __typename: 'Mutation', createReservation: { __typename: 'CreateReservationResult', success: boolean, errors: Array<{ __typename: 'IllegalActionError', message: string } | { __typename: 'ValidationError', field: string, hint?: Maybe<string>, message: string } | { __typename: 'DataInconsistencyError', message: string }>, reservation?: Maybe<(
      { __typename: 'Reservation' }
      & ReservationFragment
    )> } };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['ID'];
  actions: Array<ReservationAction> | ReservationAction;
}>;


export type UpdateReservationMutation = { __typename: 'Mutation', updateReservation: { __typename: 'UpdateReservationResult', success: boolean, errors: Array<{ __typename: 'IllegalActionError', message: string } | { __typename: 'ValidationError', field: string, hint?: Maybe<string>, message: string } | { __typename: 'DataInconsistencyError', message: string }>, reservation?: Maybe<(
      { __typename: 'Reservation' }
      & ReservationFragment
    )> } };

export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  __typename
  id
  denomination
}
    `;
export const ModelFragmentDoc = gql`
    fragment Model on Model {
  __typename
  id
  denomination
  category {
    ...Category
  }
}
    ${CategoryFragmentDoc}`;
export const AssetFragmentDoc = gql`
    fragment Asset on Asset {
  __typename
  id
  denomination
  model {
    __typename
    id
    denomination
  }
}
    `;
export const TimeSlotFragmentDoc = gql`
    fragment TimeSlot on TimeSlot {
  __typename
  startTime
  endTime
  available
}
    `;
export const ReservationFragmentDoc = gql`
    fragment Reservation on Reservation {
  __typename
  id
  startTime
  endTime
  model {
    __typename
    id
    denomination
  }
  completedAt
}
    `;
export const PageInfoFieldsFragmentDoc = gql`
    fragment PageInfoFields on PageInfo {
  hasNextPage
  endCursor
}
    `;
export const AllCategoriesDocument = gql`
    query AllCategories($first: Int, $after: String) {
  organisation {
    categories(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Category
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${CategoryFragmentDoc}`;
export const SingleCategoryDocument = gql`
    query SingleCategory($id: ID!) {
  category(id: $id) {
    ...Category
  }
}
    ${CategoryFragmentDoc}`;
export const AllModelsDocument = gql`
    query AllModels($first: Int, $after: String) {
  organisation {
    models(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Model
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${ModelFragmentDoc}`;
export const ModelsByCategoryDocument = gql`
    query ModelsByCategory($categoryId: ID!, $first: Int, $after: String) {
  category(id: $categoryId) {
    models(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}`;
export const SingleModelDocument = gql`
    query SingleModel($id: ID!) {
  model(id: $id) {
    ...Model
  }
}
    ${ModelFragmentDoc}`;
export const AllAssetsDocument = gql`
    query AllAssets($first: Int, $after: String) {
  organisation {
    assets(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Asset
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${AssetFragmentDoc}`;
export const SingleAssetDocument = gql`
    query SingleAsset($id: ID!) {
  asset(id: $id) {
    ...Asset
  }
}
    ${AssetFragmentDoc}`;
export const AssetsByModelDocument = gql`
    query AssetsByModel($modelId: ID!, $first: Int, $after: String) {
  model(id: $modelId) {
    assets(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Asset
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${AssetFragmentDoc}`;
export const TimeSlotsByModelDocument = gql`
    query TimeSlotsByModel($modelId: ID!, $filter: TimeSlotFilter, $first: Int, $after: String) {
  model(id: $modelId) {
    slots(filter: $filter, first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...TimeSlot
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${TimeSlotFragmentDoc}`;
export const SingleReservationDocument = gql`
    query SingleReservation($id: ID!) {
  reservation(id: $id) {
    ...Reservation
  }
}
    ${ReservationFragmentDoc}`;
export const CreateReservationDocument = gql`
    mutation CreateReservation($draft: ReservationDraft!) {
  createReservation(draft: $draft) {
    success
    errors {
      message
      ... on ValidationError {
        field
        hint
      }
    }
    reservation {
      ...Reservation
    }
  }
}
    ${ReservationFragmentDoc}`;
export const UpdateReservationDocument = gql`
    mutation UpdateReservation($id: ID!, $actions: [ReservationAction!]!) {
  updateReservation(id: $id, actions: $actions) {
    success
    errors {
      message
      ... on ValidationError {
        field
        hint
      }
    }
    reservation {
      ...Reservation
    }
  }
}
    ${ReservationFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AllCategories(variables?: AllCategoriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllCategoriesQuery> {
      return withWrapper(() => client.request<AllCategoriesQuery>(print(AllCategoriesDocument), variables, requestHeaders));
    },
    SingleCategory(variables: SingleCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleCategoryQuery> {
      return withWrapper(() => client.request<SingleCategoryQuery>(print(SingleCategoryDocument), variables, requestHeaders));
    },
    AllModels(variables?: AllModelsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllModelsQuery> {
      return withWrapper(() => client.request<AllModelsQuery>(print(AllModelsDocument), variables, requestHeaders));
    },
    ModelsByCategory(variables: ModelsByCategoryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ModelsByCategoryQuery> {
      return withWrapper(() => client.request<ModelsByCategoryQuery>(print(ModelsByCategoryDocument), variables, requestHeaders));
    },
    SingleModel(variables: SingleModelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleModelQuery> {
      return withWrapper(() => client.request<SingleModelQuery>(print(SingleModelDocument), variables, requestHeaders));
    },
    AllAssets(variables?: AllAssetsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllAssetsQuery> {
      return withWrapper(() => client.request<AllAssetsQuery>(print(AllAssetsDocument), variables, requestHeaders));
    },
    SingleAsset(variables: SingleAssetQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleAssetQuery> {
      return withWrapper(() => client.request<SingleAssetQuery>(print(SingleAssetDocument), variables, requestHeaders));
    },
    AssetsByModel(variables: AssetsByModelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AssetsByModelQuery> {
      return withWrapper(() => client.request<AssetsByModelQuery>(print(AssetsByModelDocument), variables, requestHeaders));
    },
    TimeSlotsByModel(variables: TimeSlotsByModelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TimeSlotsByModelQuery> {
      return withWrapper(() => client.request<TimeSlotsByModelQuery>(print(TimeSlotsByModelDocument), variables, requestHeaders));
    },
    SingleReservation(variables: SingleReservationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleReservationQuery> {
      return withWrapper(() => client.request<SingleReservationQuery>(print(SingleReservationDocument), variables, requestHeaders));
    },
    CreateReservation(variables: CreateReservationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReservationMutation> {
      return withWrapper(() => client.request<CreateReservationMutation>(print(CreateReservationDocument), variables, requestHeaders));
    },
    UpdateReservation(variables: UpdateReservationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateReservationMutation> {
      return withWrapper(() => client.request<UpdateReservationMutation>(print(UpdateReservationDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;