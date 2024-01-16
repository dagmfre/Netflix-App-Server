import axios from "axios";
import { useState } from "react";
import SuInput2 from "../components/SuInput2";
import SuInput3 from "../components/SuInput3";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmail = (data) => {
    setUsername(data.username);
  };
  const handlePassword = (data) => {
    setPassword(data.password);
    console.log(data)
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.status === 200) {
        navigate("/netflix-account", );
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
      <Link className="logo-cont" to={"/"}>
        <img src="logo.png" alt="" className="logo" />
      </Link>
      <form className="form">
        <h1>Login</h1>
        <SuInput2 sentData={handleEmail} />
        <SuInput3 sentData={handlePassword} />
        <div className="last-qsn">
          <h4>
            <span>Don't have an account?</span>
            <Link to={"/signup"}>Sign up now</Link>
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
  );
}
