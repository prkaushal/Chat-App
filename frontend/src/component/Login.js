import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Login = () => {
  const [name, setName] = useState("");

  return (
    <div className="joinPage">
      <div className="joinContainer">
        <h1 className="heading">Chat App</h1>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="joinInput"
          placeholder="your name...."
        />
        <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
          <button className="joinbtn" onClick={sendUser}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
export { user };
