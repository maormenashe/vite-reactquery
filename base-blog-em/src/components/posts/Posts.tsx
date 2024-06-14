import * as React from "react";
import { useState } from "react";
import { Post } from "../../types/posts/Post.type";
import PostDetail from "./PostDetail/PostDetail";

interface IPostsProps {}

// const macPostPage = 10;

const Posts: React.FunctionComponent<IPostsProps> = () => {
  const [currentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [];

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
