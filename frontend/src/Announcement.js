import React from "react";
import "./Announcement.css";

const Announcement = (props) => {
  return (
    <div className="announcement-container">
      <p id="date">{props.date}</p>
      <p id="body">{props.body}</p>
    </div>
  );
};

export default Announcement;
