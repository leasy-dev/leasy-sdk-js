import { NotFoundError } from './errors';

export type Page<TNode> = {
  nodes: (TNode | null)[];
} & NextControl<TNode> &
  PreviousControl<TNode>;

export type NextControl<TNode> =
  | { hasNext: false }
  | { hasNext: true; next: () => Promise<Page<TNode>> };

export type PreviousControl<TNode> =
  | { hasPrevious: false }
  | { hasPrevious: true; previous: () => Promise<Page<TNode>> };

type PageInfo = {
  readonly hasNextPage?: boolean;
  readonly endCursor?: string;
};

type ConnectionType<TNode> = {
  readonly pageInfo: PageInfo;
  readonly edges?: readonly {
    readonly node?: TNode;
  }[];
};

export type PaginatedQueryOptions = { pageSize?: number };

export type PaginationVars = { first: number | null; after: string | null };

export type PaginatedQuery<TNode, TVariables extends {}> = (
  variables: TVariables,
  options?: PaginatedQueryOptions,
) => Promise<Page<TNode>>;

export type VariablelessPaginatedQuery<TNode> = (
  options?: PaginatedQueryOptions,
) => Promise<Page<TNode>>;

export function createVariablelessPaginatedQuery<TNode>(
  queryFn: (variables: PaginationVars) => Promise<any>,
  accessFn: (result: any) => ConnectionType<TNode> | undefined,
): VariablelessPaginatedQuery<TNode> {
  const paginatedQuery = createPaginatedQuery(queryFn, accessFn);
  return (options?: PaginatedQueryOptions) => {
    return paginatedQuery(void 0, options);
  };
}

export function createPaginatedQuery<TNode, TVariables>(
  queryFn: (variables: TVariables & PaginationVars) => Promise<any>,
  accessFn: (result: any) => ConnectionType<TNode> | undefined,
): PaginatedQuery<TNode, TVariables> {
  return (variables: TVariables, options: PaginatedQueryOptions = {}) => {
    const pages: Array<Promise<Page<TNode>>> = [];

    function paginate(index: number, paginationVars: PaginationVars): Promise<Page<TNode>> {
      if (!pages[index]) {
        pages[index] = queryFn({ ...variables, ...paginationVars })
          .then(accessFn)
          .then(
            (connection): Page<TNode> => {
              if (!connection) {
                throw new NotFoundError();
              }
              return {
                hasNext: connection.pageInfo.hasNextPage ?? false,
                // @ts-expect-error
                next: () => {
                  if (connection.pageInfo.endCursor) {
                    return paginate(index + 1, {
                      first: paginationVars.first,
                      after: connection.pageInfo.endCursor,
                    });
                  }
                  return null;
                },
                hasPrevious: index !== 0,
                previous: () => pages[index - 1] ?? null,
                nodes: connection.edges?.map(edge => edge.node ?? null) ?? [],
              };
            },
          );
      }
      return pages[index];
    }

    return paginate(0, { first: options.pageSize ?? null, after: null });
  };
}
