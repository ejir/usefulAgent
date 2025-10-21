// Simple seed script to populate a couple of users
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findMany();
  if (existing.length === 0) {
    await prisma.user.createMany({
      data: [
        { email: 'alice@example.com', name: 'Alice' },
        { email: 'bob@example.com', name: 'Bob' }
      ]
    });
    console.log('Seeded users');
  } else {
    console.log('Users already exist, skipping seed');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
