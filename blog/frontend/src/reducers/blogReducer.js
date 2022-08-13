import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

let initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      return [...state, action.payload];
    },
    upvoteBlog(state, action) {
      const blogToUpvote = state.find((blog) => blog.id === action.payload);
      const upvotedBlog = { ...blogToUpvote, votes: blogToUpvote.votes + 1 };
      return state.map((blog) =>
        blog.id === upvotedBlog.id ? upvotedBlog : blog,
      );
    },
    replaceBlog(state, action) {
      const blogToReplace = action.payload;
      return state.map((blog) =>
        blog.id === blogToReplace.id ? blogToReplace : blog,
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(title, author, url);
    dispatch(addBlog(addedBlog));
  };
};

export const upvoteBlog = (blog) => {
  return async (dispatch) => {
    const upvotedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.updatePost(upvotedBlog);
    dispatch(replaceBlog(updatedBlog));
  };
};

export const addCommentToBlog = (blog, comment) => {
  return async (dispatch) => {
    const blogToCommentOn = { ...blog, comments: [...blog.comments, comment] };
    const updatedBlog = await blogService.updatePost(blogToCommentOn);
    try {
      dispatch(replaceBlog(updatedBlog));
      dispatch(setNotification("Comment Added!", false));
    } catch (error) {
      dispatch(setNotification("Error adding comment!", true));
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deletePost(id);
    dispatch(removeBlog(id));
  };
};

const { setBlogs, addBlog, removeBlog, replaceBlog } = blogSlice.actions;
export default blogSlice.reducer;
