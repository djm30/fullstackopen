import { useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import { tryLoginFromLocal } from "./reducers/authReducer";
import SingleBlog from "./components/SingleBlog";
import { useBlog } from "./hooks";
import User from "./components/User";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(tryLoginFromLocal());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Message />
      <div className="min-h-full mb-6">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs/new" element={<BlogForm />} />
          <Route path="/blogs/:id" element={<SingleBlog blog={useBlog()} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
