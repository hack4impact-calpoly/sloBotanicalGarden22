import React from "react";
import "./Announcement.css";

const Announcement = (props) => {
  return (
    <div className="announcement-container">
      <p id="title">{props.title}</p>
      <p id="date">
        {props.name} | {props.poster}
      </p>
      <p id="content">{props.content}</p>
    </div>
  );
};

export default Announcement;
