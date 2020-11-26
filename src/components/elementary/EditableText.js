import React, { useState, useRef, useEffect } from "react";
import { withMobileDialog } from "@material-ui/core";

function useOutsideAlerter(ref, setEditing) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function EditableText(props) {
  const [state, setState] = useState(props.text);
  const [isEditing, setEditing] = useState(false);
  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, setEditing);

  useEffect(() => {
    if (!isEditing && state !== props.text) props.handleTextUpdate(state,props.index);
  }, [isEditing]);

  const handleClick = (e) => {
    isEditing ? setEditing(false) : setEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      setEditing(false);
    }
  };

  const handleChange = (e) => {
    setState(e.target.value);
  };

  let field = isEditing ? (
    <input
      className="editable-text"
      ref={wrapperRef}
      type="text"
      value={state}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <p className="editable-text" onClick={handleClick}>
      {state}
    </p>
  );

  return <div>{field}</div>;
}

export default EditableText;
