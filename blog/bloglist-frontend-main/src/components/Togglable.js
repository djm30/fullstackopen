import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const showButtonStyle = { display: visible ? "none" : "" };
  const cancelButtonStyle = { display: visible ? "" : "none" };
  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <button style={showButtonStyle} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      {visible ? props.children : <></>}
      <button style={cancelButtonStyle} onClick={toggleVisibility}>
        Cancel
      </button>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
