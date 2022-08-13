import { useState } from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => setValue("");

  return [
    reset,
    {
      type,
      value,
      onChange,
    },
  ];
};

export const useBlog = () => {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  const chosenBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;
  return chosenBlog;
};
