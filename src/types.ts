export type UpdateFn<TAction, TActionCreator, TResult> = (
  /** The ID of the resouce to update. */
  id: string,
  /** Pass actions directly or  */
  actions: TAction | TAction[] | ((creator: TActionCreator) => TAction | TAction[]),
) => Promise<TResult>;
