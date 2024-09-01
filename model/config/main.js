require("dotenv").config();
const cors = require("cors");
const useCombineRoutes = require("../routes/config");
const eventListnerFunction = require("./utils/helper/emitters/event-listner");

const config = () => {

  useCombineRoutes();

  // Handling the unhandledRejection
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
  });

  // Handling the uncaughtException
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  // This file has been imported to listen the events
  eventListnerFunction();

};

module.exports = config;
