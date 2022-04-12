import React from "react";
import "./AnnouncementBar.css";
import Announcement from "./Announcement";
import { fetchData, putData } from "../../dynoFuncs";

const fetchDataFormDynamoDb = async () => {
  console.log("IN FETCH");
  const item = await fetchData("admin_announcements").then((data) => {
    return data.Items;
  });
  return item;
};

const postAnnouncement = (item) => {
  console.log("In postAnnouncement");
  return putData("admin_announcements", item);
};

class AnnouncementBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchDataFormDynamoDb().then((result) => {
      this.setState({ messages: result, loading: false });
    });
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <div></div>
        ) : (
          <div className="bar-container">
            {this.state.messages.map((announcement) => (
              <Announcement
                name={announcement.name}
                date={announcement.date}
                title={announcement.title}
                body={announcement.content}
                poster={announcement.poster}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}

export default AnnouncementBar;
