import React from "react";
import { useState } from "react";

function SuInput2({ sentData, ...props }) {
  console.log(props.firstPageEmail);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState(
    `${props.firstPageEmail ? props.firstPageEmail : ""}`
  );
  const [usernameInputValue, setUsernameInputValue] = useState("");

  function focusHandler2() {
    setIsEmailFocused(true);
  }
  function focusHandler1() {
    setIsUsernameFocused(true);
  }
  function usernameHandler(e) {
    setUsernameInputValue(e.target.value);
    sentData({ username: e.target.value, email: emailInputValue });
  }
  function emailHandler(e) {
    setEmailInputValue(e.target.value);
    sentData({ email: e.target.value, username: usernameInputValue });
  }
  function offFocusHandler2() {
    if (emailInputValue === "") {
      setIsEmailFocused(!isEmailFocused);
    }
  }

  function offFocusHandler1() {
    if (usernameInputValue === "") {
      setIsUsernameFocused(!isUsernameFocused);
    }
  }

  return (
    <div className="username-main-cont">
      <div className="username-cont">
        <input
          id="input1"
          type="text"
          name="username"
          value={usernameInputValue}
          onFocus={focusHandler1}
          onChange={usernameHandler}
          onBlur={offFocusHandler1}
          required
        />
        <label
          htmlFor="input1"
          className={`overlay-label ${
            isUsernameFocused || usernameInputValue !== "" ? "focus" : ""
          }`}
        >
          <span className="span-email">Username</span>
        </label>
      </div>

      <div className="email-cont">
        <input
          id="input2"
          type="email"
          name="email"
          value={emailInputValue}
          onFocus={focusHandler2}
          onChange={emailHandler}
          onBlur={offFocusHandler2}
          required
        />
        <label
          htmlFor="input2"
          className={`overlay-label ${
            isEmailFocused || emailInputValue !== "" ? "focus" : ""
          }`}
        >
          <span className="span-email">Email or phone number</span>
        </label>
      </div>

      <button type="submit" className="btn btn-lg btn-danger submit1">
        <span>
          Get Started<i className="fa-solid fa-chevron-right"></i>
        </span>
      </button>
    </div>
  );
}

export default SuInput2;
