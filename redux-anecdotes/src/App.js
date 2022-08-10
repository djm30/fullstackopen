import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initialiseAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialiseAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
