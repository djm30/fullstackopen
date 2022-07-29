import React from "react";
import "./style.css";

const DisplayMessage = ({ messageInfo, setMessage, timeToDisplay }) => {
  if (messageInfo) {
    setTimeout(() => {
      setMessage();
    }, timeToDisplay);
    return (
      <div className={messageInfo.isError ? "error" : "success"}>
        {messageInfo.message}
      </div>
    );
  } else return <></>;
};

export default DisplayMessage;
