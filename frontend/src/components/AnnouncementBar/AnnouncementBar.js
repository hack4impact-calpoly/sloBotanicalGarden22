import React, { useState, useEffect } from "react";
import { fetchData } from "../../dynoFuncs";
import Announcement from "./Announcement";
import { Box } from "@chakra-ui/react";
import "./AnnouncementBar.css";
import AnnouncementForm from "./announcementForm";

const AnnouncementBar = () => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    fetchData("admin_announcements").then((data) => setMessages(data));
  }, []);

  if (!messages) return null;

  return (
    <div>
      <Box>
        {messages.map((announcement) => (
          <Announcement
            name={announcement.name}
            date={announcement.date}
            title={announcement.title}
            body={announcement.content}
            poster={announcement.poster}
          />
        ))}
      </Box>
      <AnnouncementForm />
    </div>
  );
};

export default AnnouncementBar;
