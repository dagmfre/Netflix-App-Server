import React from "react";
import SuInput2 from "./SuInput2";
import SuInput3 from "./SuInput3";
import { useLocation } from "react-router-dom";

function SignUp() {
  const location = useLocation();
  const email = location.state.email;

  return (
    <div className="input-field sign-up">
      <div className="su-back-div">
        <img src="logo.png" alt="" className="logo" />
        <h1>Sign Up</h1>
        <form
          className="form"
          action="http://localhost:3000/register"
          method="POST"
        >
          <div className="fir-input-div">
            <SuInput2 email={email} />
          </div>
          <div className="sec-input-div">
            <SuInput3 />
          </div>
          <button type="submit" class="btn btn-danger btn-lg">
            Sign Up
          </button>
          <div className="div-img">
            <a href="/auth/google">
              <img
                className="google"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
            </a>
            <a href="/auth/facebook">
              <img className="fb" src="fb.png" alt="fb-logo" />
            </a>
          </div>
          <div className="last-qsn">
            <h4>
              <span>Already Have an Account?</span>
              <a href="/#">Log in</a>
            </h4>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
