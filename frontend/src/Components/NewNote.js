import React, { useState } from "react";
import noteService from "../Services/notes";

const NewNote = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const noteToAdd = {
      content: newNote,
      date: Date.now(),
      important: Math.random() < 0.5,
    };

    noteService.create(noteToAdd).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Add Note</button>
      </form>
    </>
  );
};

export default NewNote;
