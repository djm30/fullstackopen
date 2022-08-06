import React from "react";
import "./message.css";

const Message = ({ message, setMessage }) => {
  const { error, content } = message;

  if (content) {
    setTimeout(() => {
      setMessage({ error: false, content: "" });
    }, 5000);
  }
  return (
    <>
      {content ? (
        <div className={`message ${error ? "error" : "success"}`}>
          {content}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Message;
