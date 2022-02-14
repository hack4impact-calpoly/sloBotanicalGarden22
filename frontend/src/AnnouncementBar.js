import React from "react";
import "./AnnouncementBar.css";
import Announcement from "./Announcement";
import { useState, useEffect } from "react";
import announcements from "./Data";

const AnnouncementBar = () => {
  /*
    let [announcements, setAnnouncements] = useState([]);

   Call to backend to all announcements

  useEffect(() => {
    const getAnnouncements = () => {
      let data = await fetch("http://localhost:3001/api/announcement");
      setAnnouncements(await data.json());
    };
    getAnnouncements();
  }, []);
  */

  return (
    <div className="bar-container">
      <h2>Admin Announcements</h2>
      {announcements.map((announcement) => (
        <Announcement
          name={announcement.name}
          date={announcement.date}
          title={announcement.title}
          body={announcement.body}
        />
      ))}
    </div>
  );
};

export default AnnouncementBar;
