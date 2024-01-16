import React from "react";
import { useNavigate } from "react-router-dom";

function SiInput() {
  const navigate = useNavigate();
  function handleSbumit(e) {
    e.preventDefault();
    navigate("/signup", { state: {} });
  }
  return (
    <div>
      <button onClick={handleSbumit} type="button" className="btn btn-danger">
        Sign In
      </button>
    </div>
  );
}

export default SiInput;
