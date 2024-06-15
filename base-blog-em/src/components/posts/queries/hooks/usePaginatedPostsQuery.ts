import { useQuery } from "@tanstack/react-query";
import { postQueryKeys } from "../posts-query-key-factory";
import { fetchPosts } from "../../../../api/api";

export default function usePaginatedPostsQuery(
  pageNumber: number,
  pageSize: number = 10
) {
  return useQuery({
    queryKey: postQueryKeys.paginatedList(pageNumber, pageSize),
    queryFn: () => fetchPosts(pageNumber),
    staleTime: 2 * 1000,
  });
}
