import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPeople } from "../../api/api";
import { REACT_QUERY_INFINITE_NO_NEXT_PAGE } from "../../constants/react-query.constants";
import { paginationUtils } from "../../utils/api-pagination.utils";
import { peopleQueryKeys } from "./people-query-key-factory";

export default function useInfinitePeopleQuery(initialPageParam: number = 1) {
  return useInfiniteQuery({
    queryKey: peopleQueryKeys.infinite(),
    initialPageParam: initialPageParam,
    queryFn: ({ pageParam }) => fetchPeople(pageParam),
    getNextPageParam: (lastPage, allPages, pageParam) => {
      console.log(lastPage, allPages, pageParam);

      if (paginationUtils.hasNextPage(lastPage)) {
        return pageParam + 1;
      }

      return REACT_QUERY_INFINITE_NO_NEXT_PAGE;
    },
  });
}
