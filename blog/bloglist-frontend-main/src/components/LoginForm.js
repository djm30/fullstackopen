import React, { userState, useEffect, useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      setUser(user);
      blogService.setToken(user);
    }
  }, []);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login(username, password);
      loginService.setLocalStorage(user);
      setUser(user);
      setPassword("");
      setUsername("");
      setMessage({ error: false, content: "Login Successful!" });
    } catch (e) {
      setMessage({ error: true, content: "Login Failed!" });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
