import React from "react";
import { useState } from "react";

function SuInput3({setPassword}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");

  function focusHandler() {
    setIsFocused(true);
  }
  function valueHandler(e) {
    setinputValue(e.target.value);
    setPassword(e.target.value)
  }
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }
  return (
    <div>
      <input
        id="input3"
        type="text"
        name="password"
        value={inputValue}
        onFocus={focusHandler}
        onChange={valueHandler}
        onBlur={offFocusHandler}
      />
      <label
        htmlFor="input3"
        className={`overlay-label ${
          isFocused || inputValue !== "" ? "focus" : ""
        }`}
      >
        <span className="span-email">Password</span>
      </label>
      <button type="submit" className="btn btn-lg btn-danger get-started-btn">
        <span>Get Started<i class="fa-solid fa-chevron-right"></i></span> 
      </button>
    </div>
  );
}

export default SuInput3;
