const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./esquema');

const app = express();
const port = 4000;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`Servidor GraphQL corriendo en http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
