import React from "react";
import { useState } from "react";

function SuInput2({ sentData }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");

  function focusHandler() {
    setIsFocused(true);
  }
  function usernameHandler(e) {
    setinputValue(e.target.value);
    sentData({ username: e.target.value });
  }
  function emailHandler(e) {
    setinputValue(e.target.value);
    sentData({ email: e.target.value });
  }
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }

  return (
    <div>
      <input
        id="input1"
        type="text"
        name="username"
        value={inputValue}
        onFocus={focusHandler}
        onChange={usernameHandler}
        onBlur={offFocusHandler}
      />
      <label
        htmlFor="input1"
        className={`overlay-label ${
          isFocused || inputValue !== "" ? "focus" : ""
        }`}
      >
        <span className="span-email">Username</span>
      </label>
      <input
        id="input2"
        type="email"
        name="username"
        value={inputValue}
        onFocus={focusHandler}
        onChange={emailHandler}
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
        <span>
          Get Started<i className="fa-solid fa-chevron-right"></i>
        </span>
      </button>
    </div>
  );
}

export default SuInput2;
