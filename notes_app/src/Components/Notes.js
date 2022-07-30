import React from "react";
import noteService from "../Services/notes";
import Note from "./Note";

const Notes = ({ notes, showAll, setNotes }) => {
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  console.log();
  return (
    <>
      {notes
        .filter((note) => (showAll ? true : note.important))
        .map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
          />
        ))}
    </>
  );
};

export default Notes;
