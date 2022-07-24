import React from "react";
import Header from "./Header";
import Content from "./Content";
import Summary from "./Summary";

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Summary parts={course.parts} />
    </div>
  );
};

export default Course;
