import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserAccount from "./UserAccount";

export default function AuthUsersAcoount() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/check-auth-status", {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        } else {
          // navigate("/login");
        }
      })
      .catch((error) => {
        // navigate("/login");
        console.log(error);
      });
  }, []);
  return (
    <div>
      <UserAccount />
    </div>
  );
}
