import React, { useRef, useEffect } from "react";
import Blog from "./Blog";
import loginService from "../services/login";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Blogs = ({ blogs, setBlogs, user, setUser, setMessage }) => {
  const onLogoutPress = () => {
    setUser(null);
    loginService.logoutOfLocalStorage();
  };

  const find = (id) => blogs.find((blog) => blog.id === id);

  const likePost = async (id) => {
    const postToUpdate = find(id);
    const updatedPost = { ...postToUpdate, likes: postToUpdate.likes + 1 };
    setBlogs(
      blogs.map((blog) => {
        if (blog.id === id) return updatedPost;
        return blog;
      }),
    );
    await blogService.updatePost({ ...updatedPost });
  };

  const deletePost = async (id) => {
    const blogToDelete = find(id);
    if (
      window.confirm(`Are you sure you want to delete "${blogToDelete.title}?"`)
    ) {
      try {
        await blogService.deletePost(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage({
          error: false,
          content: "Blog Deleted!",
        });
      } catch (e) {
        setMessage({
          error: true,
          content: `Error deleting blog: ${e.message}`,
        });
      }
    }
  };

  const blogToggleRef = useRef();

  return (
    <>
      <h3>Welcome {user.name}</h3>
      <button onClick={onLogoutPress}>Logout</button>
      <br />
      <h4>Create Blog</h4>
      <Togglable buttonLabel="Add a blog" ref={blogToggleRef}>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          toggleRef={blogToggleRef}
        />
      </Togglable>

      <h4>Blogs</h4>
      <div style={{ padding: "10px" }}>
        {blogs.map((blog) => (
          <Blog
            blog={blog}
            key={blog.id}
            likePost={likePost}
            deletePost={deletePost}
          />
        ))}
      </div>
    </>
  );
};

export default Blogs;
