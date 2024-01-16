import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SuInput4() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const navigate = useNavigate();

  function focusHandler() {
    setIsFocused(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("./signup");
  };
  function valueHandler(e) {
    setinputValue(e.target.value);
  }
  function offFocusHandler() {
    if (inputValue === "") {
      setIsFocused(!isFocused);
    }
  }
  return (
    <div className="sign-up-cont">
      <form onSubmit={handleSubmit}>
        <input
          id="input-2nd"
          type="text"
          name=""
          onFocus={focusHandler}
          onChange={valueHandler}
          onBlur={offFocusHandler}
          className="input2"
        />
        <label
          htmlFor="input-2nd"
          className={`overlay-label ${isFocused ? "focus" : ""}`}
        >
          Email address
        </label>
        <button onClick={handleSubmit} type="submit" className="btn btn-lg btn-danger btn2">
          <h6 className="get-started">Get Started</h6>{" "}
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </form>
    </div>
  );
}

export default SuInput4;
