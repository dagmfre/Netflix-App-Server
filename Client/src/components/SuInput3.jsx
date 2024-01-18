import React from "react";
import { useState } from "react";

function SuInput3({ sentData }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [isEyeIconClicked, setIsEyeIconClicked] = useState(true);

  function focusHandler() {
    setIsFocused(true);
  }
  function valueHandler(e) {
    setinputValue(e.target.value);
    sentData(e.target.value);
  }
  const clickHanlder = () => {
    setIsEyeIconClicked(!isEyeIconClicked);
  };
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }
  return (
    <div>
      <input
        id="input3"
        type={`${isEyeIconClicked ? "password" : "text"}`}
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
      <i
        onClick={clickHanlder}
        className={`eye-icon fa-solid ${
          isEyeIconClicked ? "fa-eye-low-vision" : "fa-eye"
        }`}
      ></i>
      <button type="submit" className="btn btn-lg btn-danger get-started-btn">
        <span>
          Get Started<i className="fa-solid fa-chevron-right"></i>
        </span>
      </button>
    </div>
  );
}

export default SuInput3;
