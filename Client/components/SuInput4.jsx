import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SuInput4() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function focusHandler() {
    setIsFocused(true);
  }
  function valueHandler(e) {
    setinputValue(e.target.value);
    setEmail(e.target.value);
  }
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }
  function handleSumit(e) {
    e.preventDefault();
    navigate("/signup", {state: {email}})
  }
  return (
    <div className="sign-up-cont">
      <form action="/" method="POST" onSubmit={handleSumit}>
        <input
          id="input"
          type="text"
          name=""
          placeholder="Email address"
          onFocus={focusHandler}
          onChange={valueHandler}
          onBlur={offFocusHandler}
          className="input2"
        />
        <label
          htmlFor="input"
          className={`overlay-label ${isFocused ? "focus" : ""}`}
        >
          Email address
        </label>
        <button type="submit" className="btn btn-lg btn-danger btn2">
          <h6 className="get-started">Get Started</h6> <i class="fa-solid fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
}

export default SuInput4;
