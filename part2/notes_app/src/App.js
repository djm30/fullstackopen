import React from "react";
import Notes from "./Components/Notes";
import NewNote from "./Components/NewNote";
import { useState, useEffect } from "react";
import noteService from "./Services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);
  console.log("render", notes.length, "notes");

  return (
    <div>
      <h1> Notes </h1>
      <Notes notes={notes} setNotes={setNotes} showAll={showAll} />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Important" : "Show All"}
      </button>
      <h2> Add Note </h2>
      <NewNote notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
