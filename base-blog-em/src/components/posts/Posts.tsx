import * as React from "react";
import { useEffect, useState } from "react";
import { Post } from "../../types/posts/Post.type";
import PostDetail from "./PostDetail/PostDetail";
import usePaginatedPostsQuery from "./queries/hooks/usePaginatedPostsQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postQueryKeys } from "./queries/posts-query-key-factory";
import { deletePost, fetchPosts, updatePost } from "../../api/api";

interface IPostsProps {}

const maxPostPage = 10;

const Posts: React.FunctionComponent<IPostsProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const queryClient = useQueryClient();

  // The delete mutation is declared here only for the propose
  // of taking care of mutation reset.
  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
  });

  const updateMutation = useMutation({
    mutationFn: (postId: number) => updatePost(postId),
  });

  useEffect(() => {
    if (currentPage >= maxPostPage) return;

    const nextPage = currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: postQueryKeys.paginatedList(nextPage),
      queryFn: () => fetchPosts(nextPage),
    });
  }, [currentPage, queryClient]);

  const {
    data: posts,
    isError,
    error,
    isLoading,
  } = usePaginatedPostsQuery(currentPage);

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3> <p>{error.toString()}</p>
      </>
    );

  if (!posts) return <h3>No posts...</h3>;

  const handleSelectPostClick = (post: Post) => {
    deleteMutation.reset();
    updateMutation.reset();
    setSelectedPost(post);
  };

  const handleNextPageClick = () => setCurrentPage((prevPage) => prevPage + 1);

  const handlePreviousPageClick = () =>
    setCurrentPage((prevPage) => prevPage - 1);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => handleSelectPostClick(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={handlePreviousPageClick}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={handleNextPageClick}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </>
  );
};

export default Posts;
