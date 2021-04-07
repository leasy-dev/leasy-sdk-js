import { VariablelessPaginatedQuery, PaginatedQuery } from '../createPaginatedQuery';
import { AssetFragment as Asset } from '../generated/graphql-operations';

export { Asset };

export type AssetsScope = {
  /**
   * Load a single asset using its uniquely identifying ID.
   * @param id The ID of the asset to load
   * @throws {NotFoundError} if the asset was not found, this will throw a not found error
   */
  get(id: string): Promise<Asset>;
  /**
   * Load all assets in the current organisation.
   * @returns A paginated result, starting with the first page and function to navigate pages
   */
  all: VariablelessPaginatedQuery<Asset>;
  /**
   * Load all assets that belong to a specified model.
   * @param modelId The ID of the model
   * @throws {NotFoundError} if the model was not found, this will throw a not found error
   */
  byModel: PaginatedQuery<Asset, { modelId: string }>;
};
