import { PaginationResponse } from "../types/api/pagination/pagination.response.type";

const hasNextPage = <TResult>(
  paginationResponse: PaginationResponse<TResult>
) => {
  return Boolean(paginationResponse.next);
};

export const paginationUtils = {
  hasNextPage,
};
