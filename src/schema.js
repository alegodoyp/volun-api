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
  getONG(email: String): Organization
  getProjects: [Project]
  getMyProjects(email: String): [Project] 
  causes: [Cause]
  getProjectEnrolments(id: Int): [Enrolment]
  getEnrolments(email: String): [Enrolment]
  getProjectDetails(id: Int): Project
  getFavorites(email: String): [Favorite]
  getIsFavorite(email: String, id: Int): Favorite
  getIsEnrolled(email: String, id: Int): Enrolment
}

type Mutation {
  createUser(user: UserInput): User
  createOrganization(organization: OrganizationInput): Organization
  createUserLocality(email: String, locality: LocalityInput): Locality
  createOrganizationLocality(email: String, locality: LocalityInput): Locality
  createCause(description: String): Cause
  createProject(project: ProjectInput): Project
  createEnrolment(enrolment: EnrolmentInput): Enrolment
  approveEnrolment(id: Int): Enrolment
  denyEnrolment(id: Int): Enrolment
  closeEnrolment(id: Int): Enrolment
  favorite(user: String, project: Int): Favorite
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
  photo: String
  abilities: [Ability]
  interests: [Cause]
}

type Cause {
  id: ID!
  description: String
  userId: Int
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
  User: User
  Project: Project
  EnrolmentStatus: EnrolmentStatus
}

type EnrolmentStatus {
  id: ID!
  description: String
}

type Project {
  id: ID!
  title: String
  description: String
  about: String
  created: String
  workload: String
  frequency: String
  online: Boolean
  causeId: Int
  locality: String
  Organization: Organization
  Photo: [Photo]
  Cause: Cause
  ProjectStatus: ProjectStatus
  Ability: [Ability]
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
  locality: Locality
  organizationType: OrganizationType
  photo: String
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
  User: User
  Project: Project
}


input UserInput {
  firstname: String
  lastname: String
  email: String
  phone: String!
  bio: String!
  document: String!
  photo: String!
}

input LocalityInput {
  street: String
  number: String
  neighborhood: String
  city: String
  state: String
  country: String
}

input ProjectInput {
  title: String
  description: String
  about: String
  workload: String
  frequency: String
  online: Boolean
  organization: String
  status: String
  locality: String
  cause: Int
  abilities: [String]
  photos: [String]
}

input OrganizationInput {
  name: String
  description: String
  email: String
  phone: String
  website: String
  type: Int
  photo: String
}

input EnrolmentInput {
  description: String
  user: Int
  project: Int
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
        include: {
          Photo: true
        }
      })
    },
    getONG: (parent, args, ctx) => {
      return ctx.prisma.organization.findFirst({
        where: {
          email: args.email,
        },
      })
    },
    getProjects: (parent, args, ctx, info) => {
      return ctx.prisma.project.findMany({
        orderBy: {
          created: 'desc',
        },
        include: {
          Photo: true,
          Cause: true,
          ProjectStatus: true,
          Organization: true,
          Ability: true
        }
      })
    },
    getMyProjects: (parent, args, ctx) => {
      return ctx.prisma.project.findMany({
        where: {
          Organization: {
            email: args.email
          }
        },
        orderBy: {
          created: 'desc',
        },
        include: {
          Photo: true,
          Cause: true,
          ProjectStatus: true,
          Organization: true,
          Ability: true
        }
      })
    },
    getProjectDetails: (parent, args, ctx) => {
      return ctx.prisma.project.findFirst({
        where: {
          id: args.id
        },
        include: {
          Photo: true,
          Cause: true,
          ProjectStatus: true,
          Organization: true,
          Ability: true
        }
      })
    },
    getProjectEnrolments: (parent, args, ctx) => {
      return ctx.prisma.enrolment.findMany({
        where: {
          Project: {
            id: args.id
          }
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          User: true,
          Project: {
            include: {
              ProjectStatus: true,
              Photo: true,
              Organization: true
            }
          },
          EnrolmentStatus: true
        }
      })
    },getEnrolments: (parent, args, ctx) => {
      return ctx.prisma.enrolment.findMany({
        where: {
          User: {
            email: args.email
          }
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          User: true,
          Project: {
            include: {
              ProjectStatus: true,
              Photo: true,
              Organization: true,
            }
          },
          EnrolmentStatus: true
        }
      })
    },
    getFavorites: (parent, args, ctx) => {
      return ctx.prisma.favorite.findMany({
        where: {
          User: {
            email: args.email
          }
        },
        orderBy: {
          id: 'desc',
        },
        include: {  
          User: true,
          Project: {
            include: {
              ProjectStatus: true,
              Photo: true,
              Organization: true
            }
          }
        }
      })
    },
    getIsFavorite: (parent, args, ctx) => {
      return ctx.prisma.favorite.findFirst({
        where: {
          User: {
            email: args.email
          },
          Project: {
            id: args.id
          },
        },
        include: {
          User: true,
          Project: true
        }
      })
    },
    getIsEnrolled: (parent, args, ctx) => {
      return ctx.prisma.enrolment.findFirst({
        where: {
          User: {
            email: args.email
          },
          Project: {
            id: args.id
          }
        },
        include: {
          User: true,
          Project: true
        }
      })
    }
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
          document: args.user.document,
          photo: args.user.photo
        },
        create: {
          firstname: args.user.firstname,
          lastname: args.user.lastname,
          email: args.user.email,
          phone: args.user.phone,
          bio: args.user.bio,
          document: args.user.document,
          photo: args.user.photo
        },
      })
    },
    createOrganization: (parent, args, ctx) => {
      return ctx.prisma.organization.upsert({
        where: {
          email: args.organization.email,
        },
        update: {
          description: args.organization.description,
          phone: args.organization.phone,
          website: args.organization.website,
          photo: args.organization.photo
        },
        create: {
          name: args.organization.name,
          description: args.organization.description,
          email: args.organization.email,
          phone: args.organization.phone,
          website: args.organization.website,
          photo: args.organization.photo,
          OrganizationType: {
            connect: {
              id: args.organization.type
            }
          }
        },
      })
    },
    createUserLocality: (parent, args, ctx) => {
      return ctx.prisma.user.update({
        where: {
          email: args.email
        },
        data: {
          Locality: {
            create: {
              street: args.locality.street,
              number: args.locality.number,
              neighborhood: args.locality.neighborhood,
              city: args.locality.city,
              state: args.locality.state,
              country: args.locality.country
            }
          }
        },
      }).Locality()
    },
    createOrganizationLocality: (parent, args, ctx) => {
      return ctx.prisma.organization.update({
        where: {
          email: args.email
        },
        data: {
          Locality: {
            create: {
              street: args.locality.street,
              number: args.locality.number,
              neighborhood: args.locality.neighborhood,
              city: args.locality.city,
              state: args.locality.state,
              country: args.locality.country
            }
          }
        },
      }).Locality()
    },
    createCause: (parent, args, ctx) => {
      return ctx.prisma.cause.create({
        data: {
          description: args.description
        },
      })
    },
    createProject: (parent, args, ctx) => {
      return ctx.prisma.project.create({
        data: {
          title: args.project.title,
          description: args.project.description,
          about: args.project.about,
          created: new Date().toISOString(),
          workload: args.project.workload,
          frequency: args.project.frequency,
          online: args.project.online,
          Organization: {
            connect: {
              email: args.project.organization
            }
          },
          locality: args.project.locality,
          ProjectStatus: {
            connect: {
              id: 1
            }
          },
          Cause: {
            connect: {
              id: args.project.cause
            }
          },
          Photo: {
            create: [
              {
                description: args.project.photos[0]
              },
              {
                description: args.project.photos[1]
              },
              {
                description: args.project.photos[2]
              }
            ]
          },
        },
        include: {
          Photo: true,
          Cause: true,
          ProjectStatus: true,
          Organization: true
        }
      })
    },
    createEnrolment: (parent, args, ctx) => {
      return ctx.prisma.enrolment.create({
        data: {
          description: args.enrolment.description,
          User: {
            connect: {
              email: args.enrolment.user
            }
          },
          Project: {
            connect: {
              id: args.enrolment.project
            }
          },
          EnrolmentStatus: {
            connect: {
              id: 1
            }
          }
        },
        include: {
          EnrolmentStatus: true,
          Project: true
        }
      })
    },
    approveEnrolment: (parent, args, ctx) => {
      return ctx.prisma.enrolment.update({
        where: {
          id: args.id
        },
        data: {
          startDate: new Date().toISOString(),
          EnrolmentStatus: {
            connect: {
              id: 2
            }
          }
        },
        include: {
          EnrolmentStatus: true
        }
      })
    },
    denyEnrolment: (parent, args, ctx) => {
      return ctx.prisma.enrolment.update({
        where: {
          id: args.id
        },
        data: {
          EnrolmentStatus: {
            connect: {
              id: 3
            }
          }
        },
        include: {
          EnrolmentStatus: true
        }
      })
    },
    closeEnrolment: (parent, args, ctx) => {
      return ctx.prisma.enrolment.update({
        where: {
          id: args.id
        },
        data: {
          endDate: new Date().toISOString(),
          EnrolmentStatus: {
            connect: {
              id: 4
            }
          }
        },
        include: {
          EnrolmentStatus: true
        }
      })
    },
    favorite: (parent, args, ctx) => {
      return ctx.prisma.favorite.create({
        data: {
          User: {
            connect: {
              email: args.user
            }
          },
          Project: {
            connect: {
              id: args.project
            }
          }
        },
        include: {
          Project: true,
          User: true
        }
      })
    }
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})

module.exports = {
  schema
}