require("dotenv").config();

const Knex = require("knex");

const knexfile = require("../../../knexfile");

const env = process.env.SERVICE_ENV || "production";

const configOptions = knexfile[env];

exports.connection = async () => {
    try {
        const knex = Knex(configOptions);
        console.log("Connecting to database ", configOptions)
        const now = knex.raw('SELECT now()').first()
        return knex

    } catch (error) {
        throw new Error('Unable to connect to Postgres via Knex. Ensure a valid connection.')
    }

}
