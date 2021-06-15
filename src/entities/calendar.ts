import { VariablelessPaginatedQuery } from '../createPaginatedQuery';
import { CalendarFragment as Calendar } from '../generated/graphql-operations';

export { Calendar };

export type CalendarsScope = {
  /**
   * Load a single calendar using its uniquely identifying ID.
   * @param id The ID of the calendar to load
   * @throws {NotFoundError} if the calendar was not found, this will throw a not found error
   */
  get(id: string): Promise<Calendar>;
  /**
   * Load all calendars in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<Calendar>;
};
