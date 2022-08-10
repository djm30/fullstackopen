import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => {
    let anecdotes = [...state.anecdotes];
    if (state.filter)
      anecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
      );
    return anecdotes.sort((first, second) => second.votes - first.votes);
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const post = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(upvoteAnecdote(post));
    dispatch(
      setNotification(`Upvoted a post: ${post.content.slice(0, 40)}...`, 5),
    );
  };
  return (
    <>
      {[...anecdotes].map((anecdote) => (
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

export default Anecdotes;
