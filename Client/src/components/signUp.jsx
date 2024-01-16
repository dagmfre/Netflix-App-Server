import { useState } from "react";
import axios from "axios";
import SuInput2 from "./SuInput2";
import SuInput3 from "./SuInput3";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmail = (data) => {
    setEmail(data);
  };
  const handlePassword = (data) => {
    setPassword(data);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        navigate("/netflix-main-page");
        console.log(response);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response.status === 401) {
        console.log("User already exists.");
        setErr("User already exists. Please choose a different username.");
      }
    }
  };

  return (
    <div className="input-field sign-up">
      <div className="su-back-div">
        <img src="logo.png" alt="" className="logo" />
        <h1>Sign Up</h1>
        <form className="form" method="POST" onSubmit={handleRegister}>
          <div className="fir-input-div">
            <SuInput2 setEmail={handleEmail} />
          </div>
          <div className="sec-input-div">
            <SuInput3 setPassword={handlePassword} />
          </div>
          <button type="submit" class="btn btn-danger btn-lg">
            Sign Up
          </button>
          <div className="div-img">
            <a href="http://localhost:3001/auth/google">
              <img
                className="google"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
            </a>
            <a href="http://localhost:3001/auth/facebook">
              <img className="fb" src="fb.png" alt="fb-logo" />
            </a>
          </div>
          <div className="last-qsn">
            <h4>
              <span>Already Have an Account?</span>
              <Link to={"./login"}>Login</Link>
            </h4>
          </div>
          <div className="err-msg" style={{ display: err ? "" : "none" }}>
            <p>
              <i className="fa-solid fa-circle-xmark"></i>
              {err}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
