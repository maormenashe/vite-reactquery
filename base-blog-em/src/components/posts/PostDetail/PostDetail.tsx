import * as React from "react";
import "./PostDetail.css";
import { Post } from "../../../types/posts/Post.type.ts";
import usePostCommentsQuery from "../queries/hooks/usePostCommentsQuery.ts";

type PostDetailProps = {
  post: Post;
};

const PostDetail: React.FunctionComponent<PostDetailProps> = (props) => {
  const { post } = props;

  const {
    data: comments,
    isError,
    error,
    isLoading,
    isFetching,
  } = usePostCommentsQuery(post.id);

  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3> <p>{error.toString()}</p>
      </>
    );

  if (isLoading) return <h3>Loading...</h3>;

  if (!comments) return <h3>No comments...</h3>;

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isFetching && <h3>Fetching newer version...</h3>}
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
};

export default PostDetail;
