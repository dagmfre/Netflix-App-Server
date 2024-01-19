import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function MainPage() {
    const navigate = useNavigate();
    const location = useLocation();
  useEffect(() => {
    const username = location.state?.data;

    const token = localStorage.getItem("token");
    sessionStorage.setItem("username", username);
    axios
      .get("http://localhost:3001/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        navigate("/login");
        console.log("thsi is therrrrrrrrrrrrr" + error + token);
      });
  }, []);
  return (
    <div className="main-page">
      <h1>hello</h1>
    </div>
  );
}
