import axios from "axios";
import { useState } from "react";
import SuInput2 from "../components/SuInput2";
import SuInput3 from "../components/SuInput3";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmail = (data) => {
    setUsername(data);
  };
  const handlePassword = (data) => {
    setPassword(data);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        navigate('/other-route');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response.status === 401) {
        console.log("Incorrect username or password");
        setErr("Incorrect username or password");
      }
    }
  };

  return (
    <div onSubmit={handleRegister} className="login">
      <img src="logo.png" alt="" className="logo" />
      <form className="form">
        <h1>Login</h1>
        <SuInput2 sentData={handleEmail} />
        <SuInput3 sentData={handlePassword} />
        <div className="last-qsn">
          <h4>
            <span>Don't have an account?</span>
            <Link to={"./signup"}>Sign up now</Link>
          </h4>
        </div>
        <div className="err-msg" style={{ display: err ? "" : "none" }}>
          <p>
            <FontAwesomeIcon icon={faCircleXmark} />
            {err}
          </p>
        </div>
      </form>
    </div>
  );
}
