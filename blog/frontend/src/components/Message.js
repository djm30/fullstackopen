import React from "react";
import "./message.css";
import { useSelector } from "react-redux";

const Message = () => {
  const { error, content } = useSelector((state) => state.notification);

  let errorClasses = {
    header: "bg-red-600",
    body: "bg-red-400",
  };

  let successClasses = {
    header: "bg-green-600",
    body: "bg-green-400",
  };

  let classes = error ? errorClasses : successClasses;

  return (
    <div
      className={`message ${
        error ? "error" : "success"
      } fixed top-12 left-12 rounded-md w-52 transition-opacity ${
        content ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`text-white ${classes.header} px-2 py-1 rounded-t-md`}>
        {error ? "Error!" : "Success"}
      </div>
      <div className={`${classes.body} text-white px-2 py-2 rounded-b-md`}>
        {content}
      </div>
    </div>
  );
};

export default Message;
