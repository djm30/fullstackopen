import React from "react";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteFormConnect = (props) => {
  const formSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;

    props.createAnecdote(content);
    props.setNotification("Anecdote added!", 5);

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

const mapDispatchToProps = {
  setNotification,
  createAnecdote,
};

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteFormConnect);

export default ConnectedAnecdoteForm;
