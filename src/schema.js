const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Query {
    users: [User]
    causes: [Cause]
  }

  type Mutation {
    createUser(user: UserInput): User
    addCause(description: String): Cause
  }

  type User {
    id: ID!,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    interests: [Cause]
  }

  input UserInput {
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    interests: [Int]
  }

  type Cause {
    id: ID!,
    description: String
  }

`;

module.exports = typeDefs;