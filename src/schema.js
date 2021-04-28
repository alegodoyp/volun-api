/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 */
/**
 * @param {any} parent
 * @param {{ searchString: string }} args
 * @param {{ prisma: Prisma }} ctx
 */
const { makeExecutableSchema } = require('graphql-tools')
const { Context } = require('./context')

const typeDefs = `

type Query {
  getUser(email: String): User
  causes: [Cause]
}

type Mutation {
  createUser(user: UserInput): User
  createUserLocality(id: String, address: LocalityInput): Locality
  createCause(description: String): Cause
}


type User {
  id: ID
  firstname: String
  lastname: String
  email: String
  phone: String
  bio: String
  document: String
  facebook: String
  linkedIn: String
  twitter: String
  instagram: String
  locality: Locality
  photo: Photo
  abilities: [Ability]
  interests: [Cause]
}

type Cause {
  id: ID!
  description: String
}

type Ability {
  id: ID!
  description: String
}

type Achievement {
  id: ID!
  ability: Ability
  score: Float
  user: User
}

type AchievementHistory {
  id: ID!
  achievement: Achievement
}

type Review {
  id: ID!
  description: String
  rate: Int
  date: String
  project: Project
  user: User
}

type Locality {
  id: ID!
  street: String
  number: String
  neighborhood: String
  lat: String
  lng: String
  city: String
  state: String
  country: String
}

type Enrolment {
  id: ID!
  startDate: String
  endDate: String
  description: String
  user: User
  project: Project
  status: EnrolmentStatus
}

type EnrolmentStatus {
  id: ID!
  description: String
}

type Project {
  id: ID!
  name: String
  description: String
  startDate: String
  endDate: String
  workload: Int
  online: Boolean
  vacancy: Int
  organization: Organization
  status: ProjectStatus
  locality: Locality
  abilities: [Ability]
  tags: [Tag]
  causes: [Cause]
  photos: [Photo]
}

type ProjectStatus {
  id: ID!
  description: String
}

type Tag {
  id: ID!
  description: String
}

type Photo {
  id: ID!
  description: String
}

type Organization {
  id: ID!
  name: String
  description: String
  email: String
  phone: String
  website: String
  facebook: String
  linkedIn: String
  twitter: String
  instagram: String
  locality: Locality
  type: OrganizationType
  photos: [Photo]
}

type OrganizationType {
  id: ID!
  description: String
}

type Rating {
  id: ID!
  rate: Float
  count: Int
  organization: Organization
}

type Notification {
  id: ID!
  date: String
  vizualized: Boolean
  user: User
  organization: Organization
}

type Favorite {
  id: ID!
  user: User
  project: Project
}


input UserInput {
  firstname: String
  lastname: String
  email: String
  phone: String!
  bio: String!
  document: String!
}

input LocalityInput {
  street: String
  number: String
  neighborhood: String
  city: String
  state: String
  country: String
}

input Connector {
  id: Int
}
`


const resolvers = {
  Query: {
    getUser: (parent, args, ctx) => {
      return ctx.prisma.user.findFirst({
        where: {
          email: args.email,
        },
      })
    },
  },
  Mutation: {
    createUser: (parent, args, ctx) => {
      return ctx.prisma.user.upsert({
        where: {
          email: args.user.email,
        },
        update: {
          phone: args.user.phone,
          bio: args.user.bio,
          document: args.user.document
        },
        create: {
          firstname: args.user.firstname,
          lastname: args.user.lastname,
          email: args.user.email,
          phone: args.user.phone,
          bio: args.user.bio,
          document: args.user.document
        },
      })
    },
    createUserLocality: (parent, args, ctx) => {
      return (ctx.prisma.address.create({
          data: {
            id: args.user.id,
            street: args.user.street,
            number: args.user.number,
            neighborhood: args.user.neighborhood,
            city: args.user.city,
            state: args.user.state,
            country: args.user.country
          }
        })
        ,
        ctx.prisma.user.update({
          where: {
            id: args.id,
          },
          data: {
            address: {
              connect: args.user.address
            },
          },
        })
      )
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
  typeDefs
})

module.exports = {
  schema
}