const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    host: "127.0.0.1",
    user: process.env.PGDB_USER,
    port: 3001,
    password: process.env.PGDB_PASS,
    database: 'Directly'
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL DB.');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = pool; //Exporting pool for use in GraphQL Resolvers
