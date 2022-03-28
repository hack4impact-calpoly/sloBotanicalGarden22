const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const COLLECTION_NAME = "announcements";

const announcementSchema = new Schema(
  {
    // Added title field
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
  },
  { collection: COLLECTION_NAME }
);

module.exports = {
  announcementSchema: announcementSchema,
  COLLECTION_NAME: COLLECTION_NAME,
};
