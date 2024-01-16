import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NetflixMainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
  return <div className="net-accnt">
    <h1>helooooooooooo</h1>
  </div>;
}
