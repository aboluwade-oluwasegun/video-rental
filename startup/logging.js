const winston = require("winston");
//require("winston-mongodb"); //off for integration tests only
require("express-async-errors");

module.exports = function() {
  //handle uncaught exceptions
  winston.handleExceptions(
    new winston.transports.File({
      filename: "uncaughtExceptions.log"
    })
  );

  // handle unhandled promise rejection
  process.on("unhandledRejection", ex => {
    throw ex;
  });

  // add transports
  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/vidly",
  //   level: "info"
  // });
};
