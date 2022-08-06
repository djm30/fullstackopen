import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setMessage, blogs, setBlogs, toggleRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create(title, author, url);
      setBlogs(blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage({ error: false, content: "Blog added successfully" });
      toggleRef.current.toggleVisibility();
    } catch (e) {
      console.log(e);
      setMessage({ error: true, content: "Error posting blog: " + e.message });
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
