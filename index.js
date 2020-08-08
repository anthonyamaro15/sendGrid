require("dotenv").config();
const express = require("express");
const redis = require("redis");
const mail = require("./api/server");
const server = express();
const { v4 } = require("uuid");

const PORT = process.env.PORT || 4000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

server.use(express.json());

server.get("/send", (req, res) => {
  mail();
  res.status(200).json("email sent!");
});

server.get("/sendemail", (req, res) => {
  const token = v4();

  mail(process.env.TO, token);

  client.setex("token", 120, token);

  res.status(200).json({ message: "email sent successfully!", token });
});

server.post("/admin/:token", (req, res) => {
  const { email } = req.body;
  const { token } = req.params;

  client.get("token", (err, data) => {
    if (err) {
      res.status(500).json("there was an error", err);
    }
    if (data !== null) {
      if (token === data) {
        res.status(200).json("data matches!!");
      } else {
        res.status(500).json("data is not the same");
      }
    } else {
      res.status(404).json("token expired!");
    }
  });
});

server.listen(PORT, () => console.log(`server runnin in port ${PORT}`));
