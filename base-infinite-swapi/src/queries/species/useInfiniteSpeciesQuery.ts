import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSpecies } from "../../api/api";
import { REACT_QUERY_INFINITE_NO_NEXT_PAGE } from "../../constants/react-query.constants";
import { paginationUtils } from "../../utils/api-pagination.utils";
import { speciesQueryKeys } from "./species-query-key-factory";

export default function useInfiniteSpeciesQuery(initialPageParam: number = 1) {
  return useInfiniteQuery({
    queryKey: speciesQueryKeys.infinite(),
    initialPageParam: initialPageParam,
    queryFn: ({ pageParam }) => fetchSpecies(pageParam),
    getNextPageParam: (lastPage, allPages, pageParam) => {
      console.log(lastPage, allPages, pageParam);

      if (paginationUtils.hasNextPage(lastPage)) {
        return pageParam + 1;
      }

      return REACT_QUERY_INFINITE_NO_NEXT_PAGE;
    },
  });
}
