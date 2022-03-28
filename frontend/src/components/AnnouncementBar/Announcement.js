import React from "react";
import "./Announcement.css";

const Announcement = (props) => {
  return (
    <div className="announcement-container">
      <p id="title">{props.title}</p>
      <p id="date">
<<<<<<< HEAD
        {props.name} | {props.poster}
      </p>
      <p id="content">{props.content}</p>
=======
        {props.name} | {props.date}
      </p>
      <p id="body">{props.body}</p>
      <p id="body">-{props.poster}</p>
>>>>>>> f67818d8cde892b703c1043922b9a4cd53f56a22
    </div>
  );
};

export default Announcement;
