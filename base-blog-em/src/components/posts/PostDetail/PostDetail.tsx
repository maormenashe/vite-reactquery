import * as React from "react";
import "./PostDetail.css";
import { Post } from "../../../types/posts/Post.type.ts";
import { PostComment } from "../../../types/posts/PostComment.type.ts";

type PostDetailProps = {
  post: Post;
};

const PostDetail: React.FunctionComponent<PostDetailProps> = (props) => {
  const { post } = props;
  console.log(post);

  const comments: PostComment[] = [];
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
};

export default PostDetail;
