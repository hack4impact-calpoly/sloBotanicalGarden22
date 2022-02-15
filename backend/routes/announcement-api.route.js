const express = require("express");
const MongooseConnector = require("../db-helper");

const checkSuccess = (res, val) => {
  if (!val) {
    res.status(500).json({
      message: "Database error",
    });
    return;
  }

  res.status(200).json({
    successful: val,
  });
};

module.exports = (app) =>
  app.post("/announcements", async (req, res) => {
    const { title, content, poster } = req.body;
    if (title && content && poster) {
      try {
        const newAnnouncement = {
          title: title,
          content: content,
          date: new Date(),
          poster: poster,
        };
        const success = await MongooseConnector.postAnnouncement(
          newAnnouncement
        );
        checkSuccess(res, success);
      } catch (err) {
        res.status(500).send(err.message);
      }
    } else {
      response.status(400).json({
        message: "Did not supply all needed post attributes",
      });
    }
  });
