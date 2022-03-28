import React from "react";
import "./home.css";
import "../../App.css";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar.js";

export default function Home() {
  return (
    <body className="home">
      <div id="announcements">
        <AnnouncementBar />
      </div>
      <div id="dashboard">
        <h1>Dashboard</h1>
      </div>
    </body>
  );
}
