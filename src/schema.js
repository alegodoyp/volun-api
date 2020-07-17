  
const { makeExecutableSchema } = require('graphql-tools')
const { Context } = require('./context')

const typeDefs = `

type Query {
  users: [User]
}

type Mutation {
  createUser(user: UserInput): User
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
}
`


const resolvers = {
  Query: {
    users: (parent, args, ctx) => {
      return ctx.prisma.user.findMany()
    },
  },
  Mutation: {
    createUser: (parent, args, ctx) => {
      return ctx.prisma.user.create({
        data: {
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          phone: args.phone,
        },
      })
    },
  },
  User: {
    interests: (parent, args, ctx) => {
      return ctx.prisma.user
        .findOne({
          where: { id: parent.id },
        })
        .cause()
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