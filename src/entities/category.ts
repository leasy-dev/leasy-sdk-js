import { VariablelessPaginatedQuery } from '../createPaginatedQuery';
import { CategoryFragment as Category } from '../generated/graphql-operations';

export { Category };

export type CategoriesScope = {
  /**
   * Load a single category using its uniquely identifying ID.
   * @param id The ID of the category to load
   * @throws {@link NotFoundError | NotFoundError} if the category was not found, this will throw a not found error
   */
  get(id: string): Promise<Category>;
  /**
   * Load all categories in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<Category>;
};
