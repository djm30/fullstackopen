import { useState } from "react";
import "./Blog.css";

const Blog = ({ blog, likePost, deletePost }) => {
  const [viewFull, setViewFull] = useState(false);

  const content = () => {
    if (!viewFull)
      return (
        <div>
          {blog.title} {"  "}
          {blog.author}
          <button onClick={() => setViewFull(!viewFull)}>Show Full</button>
        </div>
      );
    return (
      <div>
        <p>Title: {" " + blog.title}</p>
        <p>Author: {" " + blog.author}</p>
        <p>
          Likes: {" " + blog.likes}{" "}
          <button onClick={() => likePost(blog.id)}>Like Post</button>
        </p>
        <p>
          URL: <a href={blog.url}>{" " + blog.url}</a>
        </p>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => deletePost(blog.id)}
        >
          Delete Post
        </button>
        <button onClick={() => setViewFull(!viewFull)}>Hide Details</button>
      </div>
    );
  };

  return <div className="container">{content()}</div>;
};

export default Blog;
