import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "./generated/prisma/client"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  try {
    const deletedAccounts = await prisma.account.deleteMany({});
    console.log('Deleted accounts:', deletedAccounts.count);
    
    const deletedSessions = await prisma.session.deleteMany({});
    console.log('Deleted sessions:', deletedSessions.count);
    
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