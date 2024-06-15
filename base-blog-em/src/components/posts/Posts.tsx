import * as React from "react";
import { useEffect, useState } from "react";
import { Post } from "../../types/posts/Post.type";
import PostDetail from "./PostDetail/PostDetail";
import usePaginatedPostsQuery from "./queries/hooks/usePaginatedPostsQuery";
import { useQueryClient } from "@tanstack/react-query";
import { postQueryKeys } from "./queries/posts-query-key-factory";
import { fetchPosts } from "../../api/api";

interface IPostsProps {}

const maxPostPage = 10;

const Posts: React.FunctionComponent<IPostsProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const queryClient = useQueryClient();
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
            onClick={() => setSelectedPost(post)}
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
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
