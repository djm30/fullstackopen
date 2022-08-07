import { useState } from "react";
import "./Blog.css";
import PropTypes from "prop-types";

const Blog = ({ blog, likePost, deletePost }) => {
  const [viewFull, setViewFull] = useState(false);

  const content = () => {
    if (!viewFull)
      return (
        <>
          {blog.title} {"  "}
          {blog.author}
          <button onClick={() => setViewFull(!viewFull)}>Show Full</button>
        </>
      );
    return (
      <>
        <p>Title: {" " + blog.title}</p>
        <p>Author: {" " + blog.author}</p>
        <p>
          Likes: {" " + blog.likes}{" "}
          <button id="like-button" onClick={() => likePost(blog.id)}>
            Like Post
          </button>
        </p>
        <p>
          URL: <a href={blog.url}>{" " + blog.url}</a>
        </p>
        <button
          id="delete-button"
          style={{ backgroundColor: "red" }}
          onClick={() => deletePost(blog.id)}
        >
          Delete Post
        </button>
        <button onClick={() => setViewFull(!viewFull)}>Hide Details</button>
      </>
    );
  };

  return <div className="container">{content()}</div>;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default Blog;
