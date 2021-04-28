const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./schema');
const { createContext } = require('./context');
const express = require('express')
const cors = require('cors');

const server = new ApolloServer({
    schema,
    context: createContext,
    playground: true,
    introspection: true,
})

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true // includes headers for the requests to backend
}

app.use(cors(corsOptions));

server.applyMiddleware({
  app,
  path: '/',
  cors: false // disbles default apollo-server cors and uses the express middleware cors in-lieu. 
})

app.listen( 4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000`)
});
  