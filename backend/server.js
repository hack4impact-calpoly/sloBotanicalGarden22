const express = require("express");
const dotenv = require("dotenv");
const MongooseConnector = require("./db-helper");
const app = express();

dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

function helloHandler(request, response) {
  console.log("Request Made");
  //const name = request.query.name;

  response.status(200);
  response.send("Hello, World!");
}

//app.use("/announcements", announcement);
require("./routes/announcement-api.route")(app);

app.get("/", helloHandler);

app.get("*", (req, res) => {
  res.status(400).send("Page not found");
});

(async () => {
  await MongooseConnector.connect();
  // Satisfy react default port
  const PORT = Number(process.env.PORT);
  if (process.argv.includes("dev")) {
    if (!PORT) {
      console.error(
        "No PORT environment var found... add it to your .env file!"
      );
      process.exit(1);
    }
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  }
})();

module.exports = app;
