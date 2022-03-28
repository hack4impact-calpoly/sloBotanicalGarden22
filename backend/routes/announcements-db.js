const mongoose = require("mongoose");
const {
  announcementSchema,
  COLLECTION_NAME,
} = require("../models/announcement");

const Announcement = mongoose.model(
  "Announcement",
  announcementSchema,
  COLLECTION_NAME
);

const announcementFns = {
  postAnnouncement: async (newAnnouncement) => {
    const newPost = new Announcement(newAnnouncement);
    const savedDoc = await newPost.save();
    return savedDoc === newPost;
  },
};

module.exports = {
  Announcement: Announcement,
  announcementFns: announcementFns,
};
