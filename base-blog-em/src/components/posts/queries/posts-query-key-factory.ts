export const postQueryKeys = {
  all: ["posts"] as const,
  paginatedList: (pageNumber: number, pageSize: number = 10) =>
    [...postQueryKeys.all, { pageNumber, pageSize }] as const,
  details: () => [...postQueryKeys.all, "details"] as const,
  detail: (postId: number) => [...postQueryKeys.details(), postId] as const,
  comments: () => [...postQueryKeys.all, "comments"] as const,
  commentsList: (postId: number) =>
    [...postQueryKeys.comments(), postId] as const,
};
