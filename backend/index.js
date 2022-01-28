const express = require("express");
const app = express();
app.use(express.json());

function helloHandler(request, response) {
  console.log("Request Made");
  //const name = request.query.name;

  response.status(200);
  response.send("Hello, World!");
}

app.get("/", helloHandler);
app.listen(3001, () => console.log("server running on port 3001"));
