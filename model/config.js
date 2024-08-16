const { Client } = require('pg');
const cloudinary = require('cloudinary').v2;
const mongoString = process.env.DATABASE_URL;
const eventListnerFunction = require("./utils/helper/emitters/event-listner");

const config = () => {

    // MongoDB Connection
    const client = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
    });

    client.connect()
        .then(() => {
            console.log("Connected to PostgreSQL database!");

            // Execute a query (create a table as an example)
            return client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
      );
    `);
        })
        .then(() => {
            console.log("Table created!");

            // Insert a sample user into the table
            return client.query(`
      INSERT INTO users (name, email)
      VALUES ('John Doe', 'john.doe@example.com')
      RETURNING *;
    `);
        })
        .then((res) => {
            console.log("Inserted user:", res.rows[0]);

            // Query the table to get all users
            return client.query('SELECT * FROM users;');
        })
        .then((res) => {
            console.log("All users:", res.rows);

            // Close the database connection
            client.end();
        })
        .catch((err) => {
            console.error("Error executing query:", err.stack);
            client.end();
        });

    // Cloudinary Files
    cloudinary.config({
        cloud_name: "dti8kpm5d",
        api_key: "312751717784482",
        api_secret: "a0Mw1XIVPe-EkEflZeKuykb8iHk",
    });

    // Handling the unhandledRejection
    process.on("unhandledRejection", (err) => {
        console.error("Unhandled Promise Rejection:", err);
    });

    // Handling the uncaughtException
    process.on("uncaughtException", (err) => {
        console.error("Uncaught Exception:", err);
    });


    // This file has been imported to listen the events
    eventListnerFunction()


}

module.exports = config