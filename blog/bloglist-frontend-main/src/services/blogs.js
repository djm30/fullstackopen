import axios from "axios";
import Blog from "../components/Blog";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (user) => {
  token = `Bearer ${user.token}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token, whocares: "fdsa" },
  };

  const reqBody = { title, author, url };
  const response = await axios.post(baseUrl, reqBody, config);
  return response.data;
};

const updatePost = async (blog) => {
  const userId = blog.user.id;
  blog.user = userId;
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, setToken, create, updatePost, deletePost };
