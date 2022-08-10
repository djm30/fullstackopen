import axios from "axios";

const getAll = async () => {
  const response = await axios.get("http://localhost:3001/anecdotes");
  return response.data;
};

const createAnecdote = async (anecdote) => {
  const payload = { content: anecdote, votes: 0 };
  const response = await axios.post("http://localhost:3001/anecdotes", payload);
  return response.data;
};

const putAnecdote = async (anecdote) => {
  const response = await axios.put(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    anecdote,
  );
  return response.data;
};

export { getAll, createAnecdote, putAnecdote };
