import React from "react";
import "./AnnouncementBar.css";
import Announcement from "./Announcement";
import { fetchData } from "../../dynoFuncs";

const fetchDataFormDynamoDb = async () => {
  const item = await fetchData("admin_announcements").then((data) => {
    console.log(data);
    return data.Items;
  });
  console.log("FETCHDATAFORM");
  console.log(item);
  return item;
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
    console.log("IN MOUNT");
    this.setState({ loading: true });
    fetchDataFormDynamoDb().then((result) => {
      console.log("ITEMS");
      console.log(result);
      this.setState({ messages: result, loading: false });
      console.log(this.state.messages);
    });
  }

  render() {
    console.log(this.state.messages);
    console.log(this.state.loading);

    return (
      <>
        <h2>Admin Announcements</h2>
        {this.state.loading ? (
          <div></div>
        ) : (
          <div className="bar-container">
            {console.log(this.state.messages)}
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
