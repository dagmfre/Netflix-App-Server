import { Link } from "react-router-dom";

export default function UserAccount(props) {
  const value = sessionStorage.getItem("username");
  console.log(value, props.username);

  return (
    <div className="user-account">
      <h2>Who's watching?</h2>
      <Link to={"/"}>
        <img src="avatar.png" alt="" />
      </Link>
      <h1 spellCheck={false} contentEditable>
        {(props.username !== undefined && props.username !== null) ||
        (value !== undefined && value !== null)
          ? props.username !== undefined
            ? props.username
            : value
          : "Type Your Name"}
      </h1>
    </div>
  );
}
