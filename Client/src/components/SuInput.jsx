import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SuInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("./signup");
  };

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
    <div className="sign-up-cont">
      <form onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          name=""
          onFocus={focusHandler}
          onChange={valueHandler}
          onBlur={offFocusHandler}
        />
        <label
          htmlFor="input"
          className={`overlay-label ${isFocused ? "focus" : ""}`}
        >
          Email address
        </label>
        <button onClick={handleSubmit} type="submit" className="btn btn-lg btn-danger get-started-btn">
          <i className="fa-solid fa-chevron-right"></i>
          <h6 className="get-started">Get Started</h6>
        </button>
      </form>
    </div>
  );
}

export default SuInput;
