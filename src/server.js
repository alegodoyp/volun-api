const { ApolloServer } = require('apollo-server-micro');
const { schema } = require('./schema');
const { createContext } = require('./context');
const cors = require('micro-cors')(); 
// const express = require('express')
// const cors = require('cors');

const server = new ApolloServer({
    schema,
    context: createContext,
    playground: true,
    introspection: true,
})

const app = express();

app.use(cors());

server.applyMiddleware({
  app,
  path: '/',
  cors: false // disbles default apollo-server cors and uses the express middleware cors in-lieu. 
})

app.listen( 443, () => {
  console.log(`🚀 Server ready at port 443`)
});