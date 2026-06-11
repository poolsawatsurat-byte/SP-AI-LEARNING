import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const deletedUsers = await prisma.user.deleteMany({});
    console.log('Deleted users:', deletedUsers.count);

    const deletedVerifications = await prisma.verification.deleteMany({});
    console.log('Deleted verifications:', deletedVerifications.count);
  } catch (error) {
    console.error('Error:', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();