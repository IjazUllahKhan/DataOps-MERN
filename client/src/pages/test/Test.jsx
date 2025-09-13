import React, { useRef } from "react";

const Test = () => {
  const headref = useRef(null);
  const show = () => {
    headref.current.style = "color:red;background:blue";
  };
  return (
    <div>
      <h1 onClick={show} ref={headref}>
        WElcome to Test Page
      </h1>
    </div>
  );
};

export default Test;
