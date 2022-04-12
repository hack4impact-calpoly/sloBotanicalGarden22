import React from "react";
import "./Announcement.css";

const Announcement = (props) => {
  return (
    <div className="announcement-container">
      <p id="title">{props.title}</p>
      <p></p>
      <p id="date">
        {props.name} | {props.date}
      </p>
      <p></p>
      <p id="body">{props.body}</p>
      <p></p>
      <p id="body">-{props.poster}</p>
      <p></p>
    </div>
  );
};

export default Announcement;
