require("dotenv").config();

let host;
let database;
let port;
let user;
let password;

if (process.env.SERVICE_ENV == "local") {
  host = "localhost";
  database = "postgres";
  port = 5432;
  user = "postgres";
  password = "postgres";
} else if (process.env.SERVICE_ENV == "development") {
  host = "10.20.14.14";
  database = "postgres";
  port = 5432;
  user = "cms";
  password = "Cm5kc1#2021";
} else if (process.env.SERVICE_ENV == "production") {
  host = "10.1.201.75";
  database = "postgres";
  port = 5432;
  user = "postgres";
  password = "inhc0mmute_cms";
}

  module.exports = {
    development: {
      client: "pg",
      connection: {
        host: host,
        database: database,
        user: user,
        password: password,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: "./infrastructure/database/migrations",
      },
    },

    testing: {
      client: "pg",
      connection: process.env.DB_URL,
      migrations: {
        directory: "./infrastructure/database/migrations",
      },
      seeds: { directory: "./infrastructure/database/seeds" },
    },

    production: {
      client: "pg",
      connection: {
        host: host,
        database: database,
        user: user,
        password: password,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: "./infrastructure/database/migrations",
      },
    },
  };
