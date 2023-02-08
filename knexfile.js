require("dotenv").config();

let host;
let database;
let port;
let user;
let password;

if (process.env.SERVER_FOR == "development") {
  host = "10.20.14.14";
  database = "postgres";
  port = 5432;
  user = "cms";
  password = "Cm5kc1#2021";
} else if (process.env.SERVER_FOR == "production") {
  host = "10.1.201.75";
  database = "postgres";
  port = 5432;
  user = "postgres";
  password = "inhc0mmute_cms";
}else {
  host = "localhost";
  database = "CMS_DEV_SERVER";
  port = 5432;
  user = "postgres";
  password = "root";
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
      // connection: process.env.DB_URL,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: "./infrastructure/database/migrations",
      },
    },

    production: {
      client: "pg",
      connection: {
        host: host,
        database: database,
        user: user,
        password: password,
      },
      // connection: process.env.DB_URL,
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: "./infrastructure/database/migrations",
      },
    },
  };
