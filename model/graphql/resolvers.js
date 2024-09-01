const client = require('../config/db');

const resolvers = {
    Query: {
        users: async () => {
            try {
                const res = await client.query("SELECT * FROM users;");
                return res.rows;
            } catch (err) {
                throw new Error("Error fetching users: " + err.message);
            }
        },
        user: async (_, { id }) => {
            try {
                const res = await client.query("SELECT * FROM users WHERE id = $1;", [id]);
                return res.rows[0];
            } catch (err) {
                throw new Error("Error fetching user: " + err.message);
            }
        },
    },
    Mutation: {
        createUser: async (_, { name, email }) => {
            try {
                const res = await client.query(
                    `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *;`,
                    [name, email]
                );
                return res.rows[0];
            } catch (err) {
                throw new Error("Error creating user: " + err.message);
            }
        },
        updateUser: async (_, { id, name, email }) => {
            try {
                const fields = [];
                const values = [];
                let fieldIndex = 1;

                if (name) {
                    fields.push(`name = $${fieldIndex++}`);
                    values.push(name);
                }
                if (email) {
                    fields.push(`email = $${fieldIndex++}`);
                    values.push(email);
                }
                values.push(id);

                const res = await client.query(
                    `UPDATE users SET ${fields.join(', ')} WHERE id = $${fieldIndex} RETURNING *;`,
                    values
                );
                return res.rows[0];
            } catch (err) {
                throw new Error("Error updating user: " + err.message);
            }
        },
        deleteUser: async (_, { id }) => {
            try {
                const res = await client.query(
                    `DELETE FROM users WHERE id = $1 RETURNING *;`,
                    [id]
                );
                return res.rows[0];
            } catch (err) {
                throw new Error("Error deleting user: " + err.message);
            }
        },
    },
};

module.exports = resolvers;
