const { ApolloServer, gql } = require('apollo-server');
const { Client } = require("pg");
const cloudinary = require("cloudinary").v2;
const eventListnerFunction = require("./utils/helper/emitters/event-listner");

const config = () => {
    // DB Connection
    const client = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
    });

    client.connect();

    const typeDefs = gql`
    type User {
      id: ID!
      name: String!
      email: String!
    }

    type Query {
      users: [User]
    }

    type Mutation {
      createUser(name: String!, email: String!): User
    }
  `;

    const resolvers = {
        Query: {
            users: async () => {
                const res = await client.query("SELECT * FROM users;");
                return res.rows;
            },
        },
        Mutation: {
            createUser: async (_, { name, email }) => {
                const res = await client.query(
                    `
            INSERT INTO users (name, email)
            VALUES ($1, $2)
            RETURNING *;
        `,
                    [name, email]
                );
                return res.rows[0];
            },
        },
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
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
    eventListnerFunction();
};

module.exports = config;
