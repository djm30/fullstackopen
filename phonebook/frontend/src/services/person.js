import axios from "axios";
const baseUrl = "/api/persons";

const get = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const update = async (id, person) => {
  return await (
    await axios.put(`${baseUrl}/${id}`, person)
  ).data;
};

const create = async (person) => {
  return await (
    await axios.post(baseUrl, person)
  ).data;
};

const deletePerson = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

const functions = {
  get,
  create,
  update,
  deletePerson,
};

export default functions;
