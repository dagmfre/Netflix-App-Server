import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAccount(props) {
  const [username, setUsername] = useState(props.username);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/main-page", { state: { data: username } });
    setUsername(props.username);
  };

  return (
    <div className="user-account">
      <h2>Who's watching?</h2>
      <img onClick={clickHandler} src="avatar.png" alt="" />
      <h1 spellCheck={false}>{props.username}</h1>
    </div>
  );
}
