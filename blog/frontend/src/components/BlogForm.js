import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import Input from "./Common/Input";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [resetTitle, titleInput] = useField("text");
  const [resetAuthor, authorInput] = useField("text");
  const [restUrl, urlInput] = useField("text");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      resetTitle();
      resetAuthor();
      restUrl();
      setMessage({ error: false, content: "Blog added successfully" });
      navigate("/");
    } catch (e) {
      console.log(e);
      setMessage({ error: true, content: "Error posting blog: " + e.message });
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <div className="text-white flex flex-col items-center mt-20">
        <Input {...titleInput} name="title">
          Title
        </Input>
        <Input {...authorInput} name="author">
          Author
        </Input>
        <Input {...url} name="url">
          Link
        </Input>
        <button
          id="blog-submit"
          className="bg-emerald-500 hover:bg-emerald-300 transition-all mt-2 px-4 py-2 rounded-md"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
