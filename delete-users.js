const { PrismaClient } = require('./generated/prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const deletedUsers = await prisma.user.deleteMany({});
    console.log('Deleted users:', deletedUsers.count);
    
    const deletedVerifications = await prisma.verification.deleteMany({});
    console.log('Deleted verifications:', deletedVerifications.count);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();