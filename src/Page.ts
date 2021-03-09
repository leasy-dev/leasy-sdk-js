export type Page<TNode> = {
  nodes: TNode[];
} & NextControl<TNode> &
  PreviousControl<TNode>;

export type NextControl<TNode> =
  | { hasNext: false }
  | { hasNext: true; next: () => Promise<Page<TNode>> };

export type PreviousControl<TNode> =
  | { hasPrevious: false }
  | { hasPrevious: true; previous: () => Promise<Page<TNode>> };
