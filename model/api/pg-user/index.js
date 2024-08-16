const http = require('http');


const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/users') && req.method === 'GET') {
        // Handle GET request - Fetch users
        try {
            const result = await client.query('SELECT * FROM users;');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.rows));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (req.url === '/users' && req.method === 'POST') {
        // Handle POST request - Create a new user
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { name, email } = JSON.parse(body);
            try {
                const result = await client.query(
                    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
                    [name, email]
                );
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.rows[0]));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
    } else if (req.url.startsWith('/users/') && req.method === 'PUT') {
        // Handle PUT request - Update a user
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { name, email } = JSON.parse(body);
            try {
                const result = await client.query(
                    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
                    [name, email, id]
                );
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.rows[0]));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
    } else if (req.url.startsWith('/users/') && req.method === 'PATCH') {
        // Handle PATCH request - Partially update a user
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const updates = JSON.parse(body);
            const fields = Object.keys(updates).map(
                (key, index) => `${key} = $${index + 1}`
            );
            const values = Object.values(updates);
            values.push(id); // Add ID to the values array

            try {
                const result = await client.query(
                    `UPDATE users SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
                    values
                );
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result.rows[0]));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        });
    } else if (req.url.startsWith('/users/') && req.method === 'DELETE') {
        // Handle DELETE request - Delete a user
        const id = req.url.split('/')[2];
        try {
            await client.query('DELETE FROM users WHERE id = $1', [id]);
            res.writeHead(204); // No content
            res.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else {
        // Handle 404 - Not found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
