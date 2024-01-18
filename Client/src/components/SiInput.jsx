import React from "react";
import { useNavigate } from "react-router-dom";

function SiInput() {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/signup")
  }

  return (
    <div>
      <button onClick={handleClick} type="button" className="btn btn-danger">
        Sign In
      </button>
    </div>
  );
}

export default SiInput;
