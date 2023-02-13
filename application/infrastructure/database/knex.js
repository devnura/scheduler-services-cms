const knex = require("knex");
require("dotenv").config();

const knexfile = require("../../../knexfile");

const env = process.env.SERVICE_ENV || "development";
// if running unit testing, please change the configOptions to knexfile["testing"]

const configOptions = knexfile[env];
// const configOptions = knexfile["testing"];


module.exports = knex(configOptions);
