import React from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import {
  upvoteBlog,
  deleteBlog,
  addCommentToBlog,
} from "../reducers/blogReducer";
import Input from "./Common/Input";

const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const [resetComment, commentInput] = useField("text");

  const addComment = () => {
    dispatch(addCommentToBlog(blog, commentInput.value));
    resetComment();
  };

  const likeBlog = () => {
    try {
      dispatch(upvoteBlog(blog));
      dispatch(setNotification("Liked Added!", false));
    } catch (error) {
      dispatch(setNotification("Error lining post!", true));
    }
  };

  const deleteBlog = () => {
    try {
      dispatch(deleteBlog(blog.id));
      dispatch(setNotification("Post Deleted!", false));
    } catch (error) {
      dispatch(setNotification("Error deleting post!", true));
    }
  };

  if (!blog) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-2xl text-white container w-full mt-20 bg-neutral-600 rounded-md p-4 text-center">
          <h2 className="text-3xl">No blog found for this ID!</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 max-w-2xl text-white container w-full mt-20 bg-neutral-600 rounded-md p-4">
        <h2 className="text-3xl">{blog.title}</h2>
        <h3 className="text-slate-300 text-2xl">by &nbsp;{blog.author}</h3>
        <a className="mt-4 text-slate-300 underline" href={blog.url}>
          Link to blog
        </a>
        <div>
          <Input {...commentInput} />{" "}
          <button
            onClick={addComment}
            className="bg-emerald-500 hover:bg-emerald-300 transition-all inline-block px-2 py-1 rounded-md"
          >
            Add Comment
          </button>
        </div>
        <div className="mt-2 mb-2">
          <h3 className=" text-xl mb-4">Comments</h3>
          {blog.comments.length === 0 ? (
            <p className="text-md">No Comments yet!</p>
          ) : (
            blog.comments.map((comment, index) => (
              <div className="text-md" key={index}>
                {comment}
              </div>
            ))
          )}
        </div>
        <div className="flex justify-between mt-2">
          <div>
            {blog.likes}
            &nbsp;&nbsp;&nbsp;
            <button
              onClick={likeBlog}
              className="bg-emerald-500 hover:bg-emerald-300 transition-all  px-2 py-1 rounded-md"
            >
              &nbsp;Like&nbsp;
            </button>
          </div>
          <button
            onClick={deleteBlog}
            className="bg-red-500 hover:bg-red-300 transition-all px-2 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
