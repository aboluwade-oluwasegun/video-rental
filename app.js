const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")(); //1st
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.port || 3000;

const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
// environment variables
// process.env.NODE_ENV = "test";

// app.listen(global.gConfig.node_port, () => {
//   console.log(
//     `${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`
//   );
// });
