import * as React from "react";
import { useState } from "react";
import { Post } from "../../types/posts/Post.type";
import PostDetail from "./PostDetail/PostDetail";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/api";

interface IPostsProps {}

// const maxPostPage = 10;

const Posts: React.FunctionComponent<IPostsProps> = () => {
  const [currentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const {
    data: posts,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    staleTime: 2 * 1000,
  });

  if (isLoading) return <h3>Loading...</h3>;

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3> <p>{error.toString()}</p>
      </>
    );

  if (!posts) return <h3>No posts...</h3>;

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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
};

export default Posts;
