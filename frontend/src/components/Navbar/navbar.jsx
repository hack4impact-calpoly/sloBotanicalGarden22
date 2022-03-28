import React from "react";
import "./navbar.css";
import logo from "../../assets/logo.png";
import vector from "../../assets/vector.png";
import userIcon from "../../assets/user-icon.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div class="navFlex">
        <Link to="/">
          <img src={logo} width="231.22px" height="119px" alt="logo" />
        </Link>
        <img id="align-nav-left" src={vector} alt="vector" />
        <h1 id="align-nav-left">Volunteer Database</h1>
      </div>

      <div class="navFlex">
        <h1 id="align-nav-right">
          <Link to="/">Home</Link>
        </h1>
        <h1 id="align-nav-right">
          <Link to="/about">Profile</Link>
        </h1>
        <img id="user-icon" src={userIcon} alt="userIcon" />
      </div>
    </nav>
  );
}
