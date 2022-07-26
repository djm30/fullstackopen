import React from "react";

import Note from "./Note";

const Notes = ({ notes, showAll }) => {
  return (
    <>
      {notes
        .filter((note) => (showAll ? true : note.important))
        .map((note) => (
          <Note key={note.id} note={note} />
        ))}
    </>
  );
};

export default Notes;
