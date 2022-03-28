import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";
import vector from "../../assets/vector.png";
import userIcon from "../../assets/user-icon.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <nav>
      <div class="footer">
        <div>
          <h2 id="love">Made with ♥ by Hack4Impact</h2>
        </div>
        <div class="navFlex">
          <Link to="/">
            <img src={logo} width="173.415px" height="89.25px" alt="logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
