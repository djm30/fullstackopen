import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const credentials = { username, password };
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getAll = async () => {
  const response = await axios.post("http://localhost:3003/api/users/all");
  return response.data;
};

const setLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const logoutOfLocalStorage = () => {
  localStorage.removeItem("user");
};

export default { login, setLocalStorage, logoutOfLocalStorage, getAll };
