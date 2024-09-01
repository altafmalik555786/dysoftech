const { Client } = require('pg');

// const client = new Client({
//     connectionString: process.env.DB_CON_STR
// });

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});


client.connect()
    .then(() => console.log("Connected to PostgreSQL database!"))
    .catch(err => console.error("Failed to connect to PostgreSQL:", err.stack));

module.exports = client;
