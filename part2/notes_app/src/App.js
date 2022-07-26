import React from "react";
import Notes from "./Components/Notes";
import NewNote from "./Components/NewNote";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", notes.length, "notes");

  return (
    <div>
      <h1> Notes </h1>
      <Notes notes={notes} showAll={showAll} />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Important" : "Show All"}
      </button>
      <h2> Add Note </h2>
      <NewNote notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
