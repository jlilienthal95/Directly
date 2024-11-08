const { Client } = require("pg");

const client = new Client({
    host: "127.0.0.1",
    user: process.env.PGDB_USER,
    port: 3001,
    password: process.env.PGDB_PASS,
    database: 'directly'
});

client.connect((err) => {
    if(err){
        console.error("Error connecting to the database:", err);
    } else{
        console.log('Connected to PostgreSQL DB.');
    }
});

module.exports = client;