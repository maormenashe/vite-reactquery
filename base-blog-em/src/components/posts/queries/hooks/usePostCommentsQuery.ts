import { useQuery } from "@tanstack/react-query";
import { postQueryKeys } from "../posts-query-key-factory";
import { fetchComments } from "../../../../api/api";

export default function usePostCommentsQuery(postId: number) {
  return useQuery({
    queryKey: postQueryKeys.commentsList(postId),
    queryFn: () => fetchComments(postId),
  });
}
