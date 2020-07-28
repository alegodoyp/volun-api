  
const { makeExecutableSchema } = require('graphql-tools')
const { Context } = require('./context')

const typeDefs = `

type Query {
  users: [User]
  causes: [Cause]
}

type Mutation {
  createUser(user: UserInput): User
  createCause(description: String): Cause
}

type User {
  id: ID!
  firstname: String!
  lastname: String!
  email: String!
  phone: String
  interests: [Cause]
}
type Cause {
  id: ID!
  description: String
}

input UserInput {
  firstname: String!
  lastname: String!
  email: String!
  phone: String
  interests: [Connector]
}

input Connector {
  id: Int
}
`


const resolvers = {
  Query: {
    users: (parent, args, ctx) => {
      return ctx.prisma.user.findMany({
        include: {
          interests: true
        }
      })
    },
    causes: (parent, args, ctx) => {
      return ctx.prisma.cause.findMany()
    },
  },
  Mutation: {
    createUser: (parent, args, ctx) => {
      return ctx.prisma.user.create({
        data: {
          firstname: args.user.firstname,
          lastname: args.user.lastname,
          email: args.user.email,
          phone: args.user.phone,
          interests: {
            connect: args.user.interests
          }
        },
      })
    },
    createCause: (parent, args, ctx) => {
      return ctx.prisma.cause.create({
        data: {
          description: args.description
        },
      })
    },
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  schema
}