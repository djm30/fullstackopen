import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const formSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;

    dispatch(createAnecdote(content));
    dispatch(setNotification("Anecdote added!", 5));

    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={formSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
