const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema.js');
const resolver = require('./resolver.js');

const server = new ApolloServer({
  typeDefs,
  resolver,
  // Enable graphiql gui
  introspection: true,
  playground: true
});

const app = express()
server.applyMiddleware({app, path: '/', cors: true})

var port = process.env.PORT||5000

app.listen({port:port}, ()=>
  console.log(`🚀 Server ready at http://localhost:${port}`)
)