import React from "react";
import { connect } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesConnect = (props) => {
  const vote = (id) => {
    const post = props.anecdotes.find((anecdote) => anecdote.id === id);

    props.upvoteAnecdote(post);
    props.setNotification(`Upvoted a post: ${post.content.slice(0, 40)}...`, 5);
  };
  return (
    <>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  let anecdotes = [...state.anecdotes];
  if (state.filter)
    anecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
    );
  return {
    anecdotes: anecdotes.sort((first, second) => second.votes - first.votes),
  };
};

const mapDispatchToProps = {
  upvoteAnecdote,
  setNotification,
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdotesConnect);
export default ConnectedAnecdotes;
