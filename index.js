require("dotenv").config();
const express = require("express");
const mail = require("./api/server");
const server = express();

server.use(express.json());

server.get("/send", (req, res) => {
  mail();
  res.status(200).json("email sent!");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server runnin in port ${PORT}`));
