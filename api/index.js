const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      firstname: 'Alice',
      lastname: 'Brie',
      email: 'alice@prisma.io',
      socialNetwork: {
        create: { facebook: 'www.facebook.com/alice123' },
      },
    },
  })
  const allUsers = await prisma.user.findMany({
    include: {
      socialNetwork: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })