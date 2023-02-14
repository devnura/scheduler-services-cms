const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("./application/helpers/winston.logger");
const cron = require("node-cron");
const moment = require("moment");

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


// ===================================================
// SCHEDULER SERVICE
// ===================================================
const paymentRequest = require('./application/services/payment-requets')
const retryPaymentRequest = require('./application/services/payment-requets-retry')

// ===================================================
// |      CODE        |          Description
// ===================================================
// | * * * * *        | At every minute.
// | 0 2 * * *        | At 02:00.
// | 30 7 * * *       | At 07:30.
// | 30 12 * * *      | At 12:30.
// | 30 17 * * *      | At 17:30.
// ===================================================

// payment request
cron.schedule("0 * * * *", async () => { console.log("scheduler service is runnig") })
cron.schedule("0 5 * * *", async () => { 
  try {
    const service = await paymentRequest.service() 
    console.log(service)
  } catch (error) {
    console.log(error)
  }
})

// retry
cron.schedule("30 7 * * *", async () => { retryPaymentRequest.service() })
cron.schedule("30 12 * * *", async () => { retryPaymentRequest.service() })
cron.schedule("30 17 * * *", async () => { retryPaymentRequest.service() })

