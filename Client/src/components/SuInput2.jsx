import React from "react";
import { useState } from "react";

function SuInput2({setEmail}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");

  function focusHandler() {
    setIsFocused(true);
  }
  function valueHandler(e) {
    setinputValue(e.target.value);
    setEmail(e.target.value)
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
        value={inputValue}
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
      <button type="submit" className="btn btn-lg btn-danger submit1">
        <span>Get Started<i class="fa-solid fa-chevron-right"></i></span> 
      </button>
    </div>
  );
}

export default SuInput2;
