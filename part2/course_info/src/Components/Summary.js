import React from "react";

const Summary = ({ parts }) => {
  return (
    <p>
      total of
      {" " +
        parts.reduce((prev, curr) => {
          return prev + curr.exercises;
        }, 0) +
        " "}
      exercises
    </p>
  );
};

export default Summary;
