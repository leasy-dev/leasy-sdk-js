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
  /** Empty payload scalar for actions without payloads. */
  EmptyPayload: {};
};

/** This error is thrown when the user tries to mutate an object that cannot be mutated e.g. when the object was deleted in the meantime but was still available in the UI. */
export type IllegalActionError = UserError & {
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
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
  /** Indicates the parameter, argument, or field that failed validation. */
  field: Scalars['String'];
  /** This is a hint that could help the user fill out the field. */
  hint: Maybe<Scalars['String']>;
};

/** This error is thrown when the user attemts an illegal action. Sometimes an action cannot be done while the data is in a certain state. In this case an IlligalActionError is returned. */
export type DataInconsistencyError = UserError & {
  /** This is a message that can be shown to the user about an error that they made. */
  message: Scalars['String'];
};

/** The root query type. */
export type Query = {
  /** Viewer namespace for all queries dependend on the viewer context. */
  viewer: Maybe<Viewer>;
  /**
   * Query a single organisation based on it's id.
   * Most authentication tokens can only read the organisation that they were made for.
   * In this case you can ommit the id parameter:
   * ```graphql
   * { organisation { id } }
   * ```
   */
  organisation: Maybe<Organisation>;
  /** Get a single reservation by it's unique ID. */
  reservation: Maybe<Reservation>;
  /** List of all API key permission levels with information about their access rights. */
  apiKeyPermissionInfos: Array<ApiKeyPermissionLevelInfo>;
  /** Get a single customer by it's unique ID. */
  customer: Maybe<Customer>;
  /** Get a single calendar by it's unique ID. */
  calendar: Maybe<Calendar>;
  /** Get a single resource by it's unique ID. */
  resource: Maybe<Resource>;
};


/** The root query type. */
export type QueryOrganisationArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** The root query type. */
export type QueryReservationArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryCustomerArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryCalendarArgs = {
  id: Scalars['ID'];
};


/** The root query type. */
export type QueryResourceArgs = {
  id: Scalars['ID'];
};

/**
 * The viewer object is a namespace for everything that is specific to the user making the API
 * request.
 */
export type Viewer = {
  /** List of all organisations that this user can access. */
  organisations: OrganisationConnection;
  /** The account of the current viewer. */
  account: Maybe<Account>;
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
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<OrganisationEdge>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
};

/** An edge in a connection. */
export type OrganisationEdge = {
  /** The item at the end of the edge */
  node: Maybe<Organisation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type Organisation = {
  /** A unique identifier for this organisation. */
  id: Scalars['ID'];
  /** The name of this organisation. */
  denomination: Scalars['String'];
  /** List of all resources available in this organisation. */
  resources: ResourceConnection;
  /** Returns all reservations within an organisation. */
  reservations: ReservationConnection;
  /** Return all calendars that belong to this organisation. */
  calendars: CalendarConnection;
  /** List of all API keys of this organisation. */
  apiKeys: ApiKeyConnection;
  /** Load all customers in this organisation. */
  customers: Maybe<CustomerConnection>;
};


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationResourcesArgs = {
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
export type OrganisationCalendarsArgs = {
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


/**
 * An organisation is the central point for all data connected to an organisation. An organisation
 * can be a business, a company, an association or just a branch within such an entity.
 */
export type OrganisationCustomersArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type ResourceConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ResourceEdge>>>;
};

/** An edge in a connection. */
export type ResourceEdge = {
  /** The item at the end of the edge */
  node: Maybe<Resource>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * A single bookable resource that belongs to an organisation.
 *
 * A resource in your system might be a person or an asset or simply a participant slot for an
 * event.
 */
export type Resource = Bookable & {
  /** A unique identifier for this resource. */
  id: Scalars['ID'];
  /** The name of this resource. */
  denomination: Maybe<Scalars['String']>;
  /** The calendar, that defines the availability of this resource. */
  calendar: Maybe<Calendar>;
  /** Show all the slots that are available */
  slots: Maybe<TimeSlotConnection>;
};


/**
 * A single bookable resource that belongs to an organisation.
 *
 * A resource in your system might be a person or an asset or simply a participant slot for an
 * event.
 */
export type ResourceSlotsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  filter?: Maybe<TimeSlotFilter>;
};

/**
 * Abstract type for an entity that can be booked. This is used to allow resources and resource
 * groups to have the same interface and make booking of these groups similar. Furthermore, no two
 * bookables have the same ID.
 */
export type Bookable = {
  /** A unique identifier for this bookable entity. */
  id: Scalars['ID'];
  /** Potentially a name to show to the user, but not all bookables might have a name. */
  denomination: Maybe<Scalars['String']>;
};

/** A calendar is a single bookable entity that saves rules for slots. */
export type Calendar = {
  /** A unique identifier for this calendar. */
  id: Scalars['ID'];
  /** The human readable name for this calendar. */
  denomination: Maybe<Scalars['String']>;
  /** List of all rules connected to this calendar. */
  rules: EventRuleConnection;
  /**
   * List of all the events in this calendar. Events are calculated from calendar rules and
   * returned here. Use the filter object to select a certain time frame or the pagination as the
   * amount of events is potentially infinite.
   */
  events: EventConnection;
};


/** A calendar is a single bookable entity that saves rules for slots. */
export type CalendarEventsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type EventRuleConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<EventRuleEdge>>>;
};

/** An edge in a connection. */
export type EventRuleEdge = {
  /** The item at the end of the edge */
  node: Maybe<EventRule>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An event rule is a description of a single event or a set of events. It describes a pattern from which the concrete events can be derived. To put this more simply: An event rule is our way of abstracting over events, reoccuring events, business hours and other calendar items. */
export type EventRule = {
  /** Lower time bound of this event rule. */
  start: Scalars['DateTime'];
  /** Upper time bound of this event rule. */
  end: Scalars['DateTime'];
};


/** A connection to a list of items. */
export type EventConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<EventEdge>>>;
};

/** An edge in a connection. */
export type EventEdge = {
  /** The item at the end of the edge */
  node: Maybe<Event>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A time slot inside of a calendar. Might include a summary and a description. */
export type Event = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type TimeSlotConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<TimeSlotEdge>>>;
};

/** An edge in a connection. */
export type TimeSlotEdge = {
  /** The item at the end of the edge */
  node: Maybe<TimeSlot>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A time slot is a time inside of a time table that can be booked. */
export type TimeSlot = {
  /** The starting time for this slot. */
  startTime: Scalars['DateTime'];
  /** Then end time for this slot. */
  endTime: Scalars['DateTime'];
  /** Is this time slot available for booking? */
  available: Maybe<Scalars['Boolean']>;
};

/** A filter for filtering a list of time slots. */
export type TimeSlotFilter = {
  /** From which point in time onwards should slots be returned? */
  after?: Maybe<Scalars['DateTime']>;
  /** Before which point in time should slots be returned? */
  before?: Maybe<Scalars['DateTime']>;
  /** If true shows only available slots, if false shows only booked slots. */
  available?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of items. */
export type ReservationConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ReservationEdge>>>;
};

/** An edge in a connection. */
export type ReservationEdge = {
  /** The item at the end of the edge */
  node: Maybe<Reservation>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/**
 * A reservation is a set of bookings that are not yet confirmed. In that sense, a reservation is
 * the equivalent of a shopping cart in a traditional ecommerce system. The difference is that a
 * reservation "reserves" the resource for a certain amount of time. This way, users have time to
 * proceed to checkout. If the reservation is not completed, it becomes stale after a while, and
 * the blocked resources are released again.
 */
export type Reservation = {
  /** A unique identifier for this reservation. */
  id: Scalars['ID'];
  /**
   * If the reservation is not completed yet, it might expire after some time.
   * This expiration time can be received from this field.
   */
  expiresAt: Maybe<Scalars['DateTime']>;
  /** The time when this reservation was completed. */
  completedAt: Maybe<Scalars['DateTime']>;
  /**
   * A reservation can have multiple bookings, that it reserves until it either times out or is
   * completed.
   */
  bookings: BookingConnection;
};


/**
 * A reservation is a set of bookings that are not yet confirmed. In that sense, a reservation is
 * the equivalent of a shopping cart in a traditional ecommerce system. The difference is that a
 * reservation "reserves" the resource for a certain amount of time. This way, users have time to
 * proceed to checkout. If the reservation is not completed, it becomes stale after a while, and
 * the blocked resources are released again.
 */
export type ReservationBookingsArgs = {
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type BookingConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<BookingEdge>>>;
};

/** An edge in a connection. */
export type BookingEdge = {
  /** The item at the end of the edge */
  node: Maybe<Booking>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A reservation for a resource or resource group. */
export type Booking = {
  /** A unique identifier for this reservation. */
  id: Scalars['ID'];
  /** This reservation was made for a model and . */
  resource: Maybe<Resource>;
  /** The point in time where this reservation starts */
  startTime: Scalars['DateTime'];
  /** The point in time where this reservation ends */
  endTime: Scalars['DateTime'];
};

/** A connection to a list of items. */
export type CalendarConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<CalendarEdge>>>;
};

/** An edge in a connection. */
export type CalendarEdge = {
  /** The item at the end of the edge */
  node: Maybe<Calendar>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** A connection to a list of items. */
export type ApiKeyConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<ApiKeyEdge>>>;
};

/** An edge in a connection. */
export type ApiKeyEdge = {
  /** The item at the end of the edge */
  node: Maybe<ApiKey>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An API key used to connect to the API */
export type ApiKey = {
  /** A unique identifier for this API key. */
  id: Scalars['ID'];
  /** A short description for this API key to remember where it is used. */
  description: Maybe<Scalars['String']>;
  /** Information about this key's permission level. */
  level: Maybe<ApiKeyPermissionLevelInfo>;
  /** This is the actual key you will use to authenticated your application. This string is only return when creating a new API key. Afterwards, this field always returns null for a key. */
  key: Maybe<Scalars['String']>;
};

/** Detailed information about an API key permission level. */
export type ApiKeyPermissionLevelInfo = {
  /** The enum value that represents this permission level. */
  enum: ApiKeyPermissionLevel;
  /** A text that describes the access level of a particular permission level. */
  description: Maybe<Scalars['String']>;
  /** Checks weather the current permission level allows creating a key with this permission level. */
  canCreate: Scalars['Boolean'];
};

/** Api keys can have different levels */
export type ApiKeyPermissionLevel =
  /** Basic read operations that are safe to do from a browser client. */
  | 'READ'
  /** This permission level allows making bookings. */
  | 'WRITE'
  /** With this permission you can take full control over the whole organization structure, change bookings, and automate resource management. */
  | 'ADMIN'
  /** This powerful token allows you to take full control over your account. If you need this type of token, please contact our support to discuss you use case. */
  | 'SUPERADMIN';

/** A connection to a list of items. */
export type CustomerConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges: Maybe<Array<Maybe<CustomerEdge>>>;
};

/** An edge in a connection. */
export type CustomerEdge = {
  /** The item at the end of the edge */
  node: Maybe<Customer>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** Data related to a customer of your business. */
export type Customer = {
  /** A unique identifier for this customer. */
  id: Scalars['ID'];
  /** The email of the customer. */
  email: Scalars['String'];
  /** The name of the customer. */
  name: Scalars['String'];
};

/** Each user has an account associated with them. */
export type Account = {
  /** A unique identifier for this account. */
  id: Scalars['ID'];
  /** The email address associated with this account. */
  email: Scalars['ID'];
  /** The name of the owner of this account. Might be null, if no name is set (yet). */
  name: Maybe<Scalars['String']>;
};

/** The root mutation type */
export type Mutation = {
  /** Create a new organisation for the currently viewing user. */
  createOrganisation: CreateOrganisationResult;
  /** Update an organisation. */
  updateOrganisation: UpdateOrganisationResult;
  /** (Soft) delete an organisation. */
  deleteOrganisation: DeleteMutationResult;
  updateAccount: UpdateAccountResult;
  createReservation: CreateReservationResult;
  /** Update a reservation. */
  updateReservation: UpdateReservationResult;
  /**
   * Cancel a reservation an release all attached bookings. The slots will be available again for
   * other bookings. Reservations expire automatically, meaning they don't need to be deleted
   * manually, but sometimes it is beneficial to release a reservation.
   */
  deleteReservation: DeleteMutationResult;
  createApiKey: CreateApiKeyResult;
  /**
   * Revoke an API key making it invalid for further usage.
   * This cannot be undone and the key will no longer show up in Leasy cloud.
   * The key will stay in the database to keep track of changes that were made with this key.
   */
  deleteApiKey: DeleteMutationResult;
  createCustomer: CreateCustomerResult;
  /** Create a new calendar with a given name. */
  createCalendar: CreateCalendarResult;
  updateCalendar: UpdateCalendarResult;
  /** Create a new resource. */
  createResource: CreateResourceResult;
  updateResource: UpdateResourceResult;
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
export type MutationUpdateAccountArgs = {
  id: Scalars['ID'];
  actions: Array<AccountAction>;
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
export type MutationDeleteReservationArgs = {
  id: Scalars['ID'];
};


/** The root mutation type */
export type MutationCreateApiKeyArgs = {
  draft: ApiKeyDraft;
};


/** The root mutation type */
export type MutationDeleteApiKeyArgs = {
  id: Scalars['ID'];
};


/** The root mutation type */
export type MutationCreateCustomerArgs = {
  draft: CustomerDraft;
};


/** The root mutation type */
export type MutationCreateCalendarArgs = {
  draft: CalendarDraft;
};


/** The root mutation type */
export type MutationUpdateCalendarArgs = {
  id: Scalars['ID'];
  actions: Array<CalendarAction>;
};


/** The root mutation type */
export type MutationCreateResourceArgs = {
  draft: ResourceDraft;
};


/** The root mutation type */
export type MutationUpdateResourceArgs = {
  id: Scalars['ID'];
  actions: Array<ResourceAction>;
};

/** Mutation result of the _createOrganisation_ mutation. */
export type CreateOrganisationResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  organisation: Maybe<Organisation>;
};

/** Draft entity that contains all fields for the creation. */
export type OrganisationDraft = {
  /** Name for the new organisation */
  denomination: Scalars['String'];
};

/** Mutation result of the _updateOrganisation_ mutation. */
export type UpdateOrganisationResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** The updated version of the organisation if all the actions were successful. */
  organisation: Maybe<Organisation>;
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
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
};

/** Mutation result of the _updateAccount_ mutation. */
export type UpdateAccountResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** If the mutation was successfull, the updated account is returned here. */
  account: Maybe<Account>;
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

/** Mutation result of the _createReservation_ mutation. */
export type CreateReservationResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  reservation: Maybe<Reservation>;
};

/** Draft entity that contains all fields for the creation. */
export type ReservationDraft = {
  /** List of bookings to be requested for this reservation. */
  bookings: Array<BookingDraft>;
};

/** This request for a booking is used when creating a reservation to indicate time and bookable, that should be reserved. */
export type BookingDraft = {
  /** The id of the bookable that this reservation should reserve. */
  bookableId: Scalars['ID'];
  /** Start of the reservation. */
  start: Scalars['DateTime'];
  /** End of the reservation. */
  end: Scalars['DateTime'];
};

/** Mutation result of the _updateReservation_ mutation. */
export type UpdateReservationResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** The updated reservation if the update was successful. */
  reservation: Maybe<Reservation>;
};

/** Input type that holds all available actions on the _Reservation_ type. */
export type ReservationAction = {
  /** Complete (checkout) a reservation making it permanent. Depending on the settings, some customer data has to be provided or a payment has to succeed. */
  complete?: Maybe<Scalars['EmptyPayload']>;
};


/** Mutation result of the _createApiKey_ mutation. */
export type CreateApiKeyResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  apiKey: Maybe<ApiKey>;
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

/** Mutation result of the _createCustomer_ mutation. */
export type CreateCustomerResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  customer: Maybe<Customer>;
};

/** Draft entity that contains all fields for the creation. */
export type CustomerDraft = {
  /** The name of the customer. */
  name: Scalars['String'];
  /** The email of this customer, used for uniquely identifying the customer. */
  email: Scalars['String'];
  /** If you are not using an organisation specific key, an organisation ID has to be specified. */
  organisationId?: Maybe<Scalars['ID']>;
};

/** Mutation result of the _createCalendar_ mutation. */
export type CreateCalendarResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  calendar: Maybe<Calendar>;
};

/** Draft entity that contains all fields for the creation. */
export type CalendarDraft = {
  /** The ID of the organisation will be determined automatically, */
  organisationId?: Maybe<Scalars['ID']>;
  /** The name of this calendar. */
  denomination?: Maybe<Scalars['String']>;
};

/** Mutation result of the _updateCalendar_ mutation. */
export type UpdateCalendarResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** Returns the updated calendar, if the mutation was successful. */
  calendar: Maybe<Calendar>;
};

/** Input type that holds all available actions on the _Calendar_ type. */
export type CalendarAction = {
  /** Set the denomination of the calendar to a new value. */
  setDenomination?: Maybe<CalendarSetDenomination>;
  /** Add a single event (rule) to the calendar. */
  addSingleEvent?: Maybe<CalendarAddSingleEvent>;
};

/** Arguments needed for the _SetDenomination_ action. */
export type CalendarSetDenomination = {
  /** The new denomination or `null` if the denomination should be deleted. */
  denomination?: Maybe<Scalars['String']>;
};

/** Arguments needed for the _AddSingleEvent_ action. */
export type CalendarAddSingleEvent = {
  /** Start time of the event. */
  start: Scalars['DateTime'];
  /** Duration of the event in milliseconds. */
  duration: Scalars['Int'];
  /** A title for this event. */
  summary?: Maybe<Scalars['String']>;
  /** A description for this event. */
  description?: Maybe<Scalars['String']>;
};

/** Mutation result of the _createResource_ mutation. */
export type CreateResourceResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** On successful creation contains the newly created entity. */
  resource: Maybe<Resource>;
};

/** Draft entity that contains all fields for the creation. */
export type ResourceDraft = {
  /** This is the name of the resource that will be displayed in the UI and potentially to your end-users. */
  denomination?: Maybe<Scalars['String']>;
  /** The organisation's ID that this resource should be attached to (not needed if you use a normal API key). */
  organisationId?: Maybe<Scalars['ID']>;
};

/** Mutation result of the _updateResource_ mutation. */
export type UpdateResourceResult = {
  /** This field indicates wheather the mutation was successful or not. */
  success: Scalars['Boolean'];
  /** This field contains all the user side errors that occurred during the execution of the mutation. */
  errors: Array<UserError>;
  /** if successful, contains the updated resource. */
  resource: Maybe<Resource>;
};

/** Input type that holds all available actions on the _Resource_ type. */
export type ResourceAction = {
  /** Associate this resource with a calendar to indicate when this resource can be booked. */
  setCalendar?: Maybe<ResourceSetCalendar>;
  /** Set the denomination of the resource to a new value. */
  setDenomination?: Maybe<ResourceSetDenomination>;
};

/** Arguments needed for the _SetCalendar_ action. */
export type ResourceSetCalendar = {
  /** The ID of the calendar that should be used for this resource. */
  calendarId: Scalars['ID'];
};

/** Arguments needed for the _SetDenomination_ action. */
export type ResourceSetDenomination = {
  /** The new denomination or `null` if the denomination should be deleted. */
  denomination?: Maybe<Scalars['String']>;
};

export type ResourceFragment = { __typename: 'Resource', id: string, denomination: Maybe<string>, calendar: Maybe<{ __typename: 'Calendar', id: string, denomination: Maybe<string> }> };

export type CalendarFragment = { __typename: 'Calendar', id: string, denomination: Maybe<string> };

export type BookingFragment = { __typename: 'Booking', id: string, startTime: string, endTime: string, resource: Maybe<{ __typename: 'Resource', id: string, denomination: Maybe<string> }> };

export type TimeSlotFragment = { __typename: 'TimeSlot', startTime: string, endTime: string, available: Maybe<boolean> };

export type ReservationFragment = { __typename: 'Reservation', id: string, expiresAt: Maybe<string>, completedAt: Maybe<string>, bookings: { __typename: 'BookingConnection', edges: Maybe<Array<Maybe<{ __typename: 'BookingEdge', node: Maybe<(
        { __typename: 'Booking' }
        & BookingFragment
      )> }>>> } };

export type PageInfoFieldsFragment = { __typename: 'PageInfo', hasNextPage: boolean, endCursor: Maybe<string> };

type UserError_IllegalActionError_Fragment = { __typename: 'IllegalActionError', message: string };

type UserError_ValidationError_Fragment = { __typename: 'ValidationError', field: string, hint: Maybe<string>, message: string };

type UserError_DataInconsistencyError_Fragment = { __typename: 'DataInconsistencyError', message: string };

export type UserErrorFragment = UserError_IllegalActionError_Fragment | UserError_ValidationError_Fragment | UserError_DataInconsistencyError_Fragment;

export type AllResourcesQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AllResourcesQuery = { __typename: 'Query', organisation: Maybe<{ __typename: 'Organisation', resources: { __typename: 'ResourceConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges: Maybe<Array<Maybe<{ __typename: 'ResourceEdge', node: Maybe<(
          { __typename: 'Resource' }
          & ResourceFragment
        )> }>>> } }> };

export type SingleResourceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleResourceQuery = { __typename: 'Query', resource: Maybe<(
    { __typename: 'Resource' }
    & ResourceFragment
  )> };

export type AllCalendarsQueryVariables = Exact<{
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type AllCalendarsQuery = { __typename: 'Query', organisation: Maybe<{ __typename: 'Organisation', calendars: { __typename: 'CalendarConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges: Maybe<Array<Maybe<{ __typename: 'CalendarEdge', node: Maybe<(
          { __typename: 'Calendar' }
          & CalendarFragment
        )> }>>> } }> };

export type SingleCalendarQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleCalendarQuery = { __typename: 'Query', calendar: Maybe<(
    { __typename: 'Calendar' }
    & CalendarFragment
  )> };

export type TimeSlotsByResourceQueryVariables = Exact<{
  resourceId: Scalars['ID'];
  filter?: Maybe<TimeSlotFilter>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
}>;


export type TimeSlotsByResourceQuery = { __typename: 'Query', resource: Maybe<{ __typename: 'Resource', slots: Maybe<{ __typename: 'TimeSlotConnection', pageInfo: (
        { __typename: 'PageInfo' }
        & PageInfoFieldsFragment
      ), edges: Maybe<Array<Maybe<{ __typename: 'TimeSlotEdge', node: Maybe<(
          { __typename: 'TimeSlot' }
          & TimeSlotFragment
        )> }>>> }> }> };

export type SingleReservationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SingleReservationQuery = { __typename: 'Query', reservation: Maybe<(
    { __typename: 'Reservation' }
    & ReservationFragment
  )> };

export type CreateReservationMutationVariables = Exact<{
  draft: ReservationDraft;
}>;


export type CreateReservationMutation = { __typename: 'Mutation', createReservation: { __typename: 'CreateReservationResult', success: boolean, errors: Array<(
      { __typename: 'IllegalActionError' }
      & UserError_IllegalActionError_Fragment
    ) | (
      { __typename: 'ValidationError' }
      & UserError_ValidationError_Fragment
    ) | (
      { __typename: 'DataInconsistencyError' }
      & UserError_DataInconsistencyError_Fragment
    )>, reservation: Maybe<(
      { __typename: 'Reservation' }
      & ReservationFragment
    )> } };

export type UpdateReservationMutationVariables = Exact<{
  id: Scalars['ID'];
  actions: Array<ReservationAction> | ReservationAction;
}>;


export type UpdateReservationMutation = { __typename: 'Mutation', updateReservation: { __typename: 'UpdateReservationResult', success: boolean, errors: Array<(
      { __typename: 'IllegalActionError' }
      & UserError_IllegalActionError_Fragment
    ) | (
      { __typename: 'ValidationError' }
      & UserError_ValidationError_Fragment
    ) | (
      { __typename: 'DataInconsistencyError' }
      & UserError_DataInconsistencyError_Fragment
    )>, reservation: Maybe<(
      { __typename: 'Reservation' }
      & ReservationFragment
    )> } };

export type DeleteReservationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteReservationMutation = { __typename: 'Mutation', deleteReservation: { __typename: 'DeleteMutationResult', success: boolean, errors: Array<(
      { __typename: 'IllegalActionError' }
      & UserError_IllegalActionError_Fragment
    ) | (
      { __typename: 'ValidationError' }
      & UserError_ValidationError_Fragment
    ) | (
      { __typename: 'DataInconsistencyError' }
      & UserError_DataInconsistencyError_Fragment
    )> } };

export const ResourceFragmentDoc = gql`
    fragment Resource on Resource {
  __typename
  id
  denomination
  calendar {
    __typename
    id
    denomination
  }
}
    `;
export const CalendarFragmentDoc = gql`
    fragment Calendar on Calendar {
  __typename
  id
  denomination
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
export const BookingFragmentDoc = gql`
    fragment Booking on Booking {
  __typename
  id
  resource {
    __typename
    id
    denomination
  }
  startTime
  endTime
}
    `;
export const ReservationFragmentDoc = gql`
    fragment Reservation on Reservation {
  __typename
  id
  expiresAt
  completedAt
  bookings(first: 100) {
    edges {
      node {
        ...Booking
      }
    }
  }
}
    ${BookingFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = gql`
    fragment PageInfoFields on PageInfo {
  __typename
  hasNextPage
  endCursor
}
    `;
export const UserErrorFragmentDoc = gql`
    fragment UserError on UserError {
  __typename
  message
  ... on ValidationError {
    field
    hint
  }
}
    `;
export const AllResourcesDocument = gql`
    query AllResources($first: Int, $after: String) {
  organisation {
    resources(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Resource
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${ResourceFragmentDoc}`;
export const SingleResourceDocument = gql`
    query SingleResource($id: ID!) {
  resource(id: $id) {
    ...Resource
  }
}
    ${ResourceFragmentDoc}`;
export const AllCalendarsDocument = gql`
    query AllCalendars($first: Int, $after: String) {
  organisation {
    calendars(first: $first, after: $after) {
      pageInfo {
        ...PageInfoFields
      }
      edges {
        node {
          ...Calendar
        }
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${CalendarFragmentDoc}`;
export const SingleCalendarDocument = gql`
    query SingleCalendar($id: ID!) {
  calendar(id: $id) {
    ...Calendar
  }
}
    ${CalendarFragmentDoc}`;
export const TimeSlotsByResourceDocument = gql`
    query TimeSlotsByResource($resourceId: ID!, $filter: TimeSlotFilter, $first: Int, $after: String) {
  resource(id: $resourceId) {
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
      ...UserError
    }
    reservation {
      ...Reservation
    }
  }
}
    ${UserErrorFragmentDoc}
${ReservationFragmentDoc}`;
export const UpdateReservationDocument = gql`
    mutation UpdateReservation($id: ID!, $actions: [ReservationAction!]!) {
  updateReservation(id: $id, actions: $actions) {
    success
    errors {
      ...UserError
    }
    reservation {
      ...Reservation
    }
  }
}
    ${UserErrorFragmentDoc}
${ReservationFragmentDoc}`;
export const DeleteReservationDocument = gql`
    mutation DeleteReservation($id: ID!) {
  deleteReservation(id: $id) {
    success
    errors {
      ...UserError
    }
  }
}
    ${UserErrorFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AllResources(variables?: AllResourcesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllResourcesQuery> {
      return withWrapper(() => client.request<AllResourcesQuery>(print(AllResourcesDocument), variables, requestHeaders));
    },
    SingleResource(variables: SingleResourceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleResourceQuery> {
      return withWrapper(() => client.request<SingleResourceQuery>(print(SingleResourceDocument), variables, requestHeaders));
    },
    AllCalendars(variables?: AllCalendarsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AllCalendarsQuery> {
      return withWrapper(() => client.request<AllCalendarsQuery>(print(AllCalendarsDocument), variables, requestHeaders));
    },
    SingleCalendar(variables: SingleCalendarQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleCalendarQuery> {
      return withWrapper(() => client.request<SingleCalendarQuery>(print(SingleCalendarDocument), variables, requestHeaders));
    },
    TimeSlotsByResource(variables: TimeSlotsByResourceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TimeSlotsByResourceQuery> {
      return withWrapper(() => client.request<TimeSlotsByResourceQuery>(print(TimeSlotsByResourceDocument), variables, requestHeaders));
    },
    SingleReservation(variables: SingleReservationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SingleReservationQuery> {
      return withWrapper(() => client.request<SingleReservationQuery>(print(SingleReservationDocument), variables, requestHeaders));
    },
    CreateReservation(variables: CreateReservationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateReservationMutation> {
      return withWrapper(() => client.request<CreateReservationMutation>(print(CreateReservationDocument), variables, requestHeaders));
    },
    UpdateReservation(variables: UpdateReservationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateReservationMutation> {
      return withWrapper(() => client.request<UpdateReservationMutation>(print(UpdateReservationDocument), variables, requestHeaders));
    },
    DeleteReservation(variables: DeleteReservationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteReservationMutation> {
      return withWrapper(() => client.request<DeleteReservationMutation>(print(DeleteReservationDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;