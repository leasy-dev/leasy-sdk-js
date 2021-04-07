import { VariablelessPaginatedQuery, PaginatedQuery } from '../createPaginatedQuery';
import { ModelFragment as Model } from '../generated/graphql-operations';

export { Model };

export type ModelsScope = {
  /**
   * Load a single model using its uniquely identifying ID.
   * @param id The ID of the model to load
   * @throws {NotFoundError} if the model was not found, this will throw a not found error
   */
  get(id: string): Promise<Model>;
  /**
   * Load all categories in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<Model>;
  /**
   * Load all models that belong to a specified category.
   * @param categoryId The ID of the category
   * @throws {NotFoundError} if the category was not found, this will throw a not found error
   */
  byCategory: PaginatedQuery<Model, { categoryId: string }>;
};
