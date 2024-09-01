const http = require('http');
const { graphql } = require('graphql');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Create the GraphQL schema
const { makeExecutableSchema } = require('@graphql-tools/schema');
const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/graphql') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const { query, variables } = JSON.parse(body);

            try {
                const result = await graphql(schema, query, null, null, variables);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});


