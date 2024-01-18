import { Link } from "react-router-dom";

export default function UserAccount(props) {
  return (
    <div className="user-account">
      <h2>Who's watching?</h2>
      <Link to={"/"}>
        <img src="avatar.png" alt="" />
      </Link>
      <h1>{props.username}</h1>
    </div>
  );
}