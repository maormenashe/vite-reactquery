import * as React from "react";
import "./PostDetail.css";
import { Post } from "../../../types/posts/Post.type.ts";
import usePostCommentsQuery from "../queries/hooks/usePostCommentsQuery.ts";
import { UseMutationResult } from "@tanstack/react-query";

type PostDetailProps = {
  post: Post;
  deleteMutation: UseMutationResult<unknown, Error, number, unknown>;
};

const PostDetail: React.FunctionComponent<PostDetailProps> = (props) => {
  const { post, deleteMutation } = props;

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
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was (not) deleted</p>
        )}
      </div>
      <div>
        <button>Update title</button>
      </div>
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
