import React from "react";
import { useState, useRef, useEffect } from "react";

function SuInput2(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState(props.email);
  const inputRef = useRef();

  useEffect(() => {
    setinputValue(inputRef.current.value);
  }, [inputValue]);

  function focusHandler() {
    setIsFocused(true);
  }
  function valueHandler(e) {
    setinputValue(e.target.value);
  }
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }
  return (
    <div>
      <input
        id="input2"
        type="text"
        name="username"
        ref={inputRef}
        value={inputValue}
        placeholder="Email address"
        onFocus={focusHandler}
        onChange={valueHandler}
        onBlur={offFocusHandler}
      />
      <label
        htmlFor="input2"
        className={`overlay-label ${
          isFocused || inputValue !== "" ? "focus" : ""
        }`}
      >
        <span className="span-email">Email or phone number</span>
      </label>
      <button type="submit" className="btn btn-lg btn-danger">
        <span>Get Started<i class="fa-solid fa-chevron-right"></i></span> 
      </button>
    </div>
  );
}

export default SuInput2;
