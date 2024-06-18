export type PaginationResponse<TResult> = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: TResult[];
};
