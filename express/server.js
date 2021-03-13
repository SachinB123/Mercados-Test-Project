const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
// app.use(cors()); // only on local
// const apiRoute = ""; // only on local
const apiRoute = "/.netlify/functions/server"; // only on for netlify

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.get("/api/test", (req, res) => {
  res
    .status(200)
    .json({message: 'Endpoint is working' });
});

app.use(apiRoute, router);

module.exports = app;
module.exports.handler = serverless(app); // only on for netlify