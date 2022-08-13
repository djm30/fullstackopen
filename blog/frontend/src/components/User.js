import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import userService from "../services/users";
import Blog from "./Blog";

const User = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const match = useMatch("/users/:id");

  useEffect(() => {
    userService
      .getById(match.params.id)
      .then((returnedUser) => setUser(returnedUser));
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 max-w-2xl text-white container w-full mt-20 bg-neutral-600 rounded-md p-4 text-center">
          <h2 className="text-3xl">No user found for this ID!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 max-w-2xl px-6 py-6 text-white container w-full mt-20 bg-neutral-600 rounded-md p-4">
        <h2 className="text-3xl">{user.name}</h2>
        <h2 className="text-2xl">Added Blogs</h2>
        {user.blogs.map((blog) => (
          <Blog blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default User;
