import { VariablelessPaginatedQuery } from '../createPaginatedQuery';
import { ResourceFragment as Resource } from '../generated/graphql-operations';

export { Resource };

export type ResourcesScope = {
  /**
   * Load a single resource using its uniquely identifying ID.
   * @param id The ID of the resource to load
   * @throws {NotFoundError} if the resource was not found, this will throw a not found error
   */
  get(id: string): Promise<Resource>;
  /**
   * Load all resources in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<Resource>;
};
