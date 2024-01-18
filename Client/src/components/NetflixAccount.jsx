import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserAccount from "./UserAccount";
import axios from "axios";

export default function NetflixMainPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.data;

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
  return (
    <div>
      <UserAccount username={username}/>
    </div>
  );
}
