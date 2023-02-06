const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helper = require("./application/helpers/helper");
const winston = require("./application/helpers/winston.logger");
const cron = require("node-cron");
const moment = require("moment");
const knex = require("./application/infrastructure/database/knex");

require("dotenv").config();

moment.locale("id");

const app = express();

var corsOptions = {
  origin: [
    "http://localhost:" + process.env.PORT || 3000,
    "http://localhost:3000",
  ],
};

// app.use(cors(corsOptions));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ============================== ROUTES API ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Service Services Card Management System.",
  });
});

app.use((req, res, next) => {
  res.status(404).json({
      message: 'Ohh you are lost, read the API documentation to find your way back home :)'
  })
})

app.listen(process.env.SERVICE_PORT, () => {
  winston.logger.info(
    `Server is running on environment: ${process.env.SERVICE_ENV.toUpperCase()} port: ${process.env.SERVICE_PORT}`
  );
});