import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ error: false, content: "" });

  useEffect(() => {
    // Sorting blogs one time
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  return (
    <div>
      <Message message={message} setMessage={setMessage} />
      <h2>{user === null ? "Login" : "Blogs"}</h2>

      {user === null ? (
        <LoginForm setUser={setUser} setMessage={setMessage} />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;
