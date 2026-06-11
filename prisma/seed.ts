import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { hash } from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const users = [
  {
    id: "admin-001",
    name: "Admin",
    email: "admin@example.com",
    password: "admin1234",
    role: "admin" as const,
  },
  {
    id: "user-001",
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    password: "user12345",
    role: "user" as const,
  },
  {
    id: "user-002",
    name: "สมหญิง รักเรียน",
    email: "somyong@example.com",
    password: "user12345",
    role: "user" as const,
  },
];

async function main() {
  for (const u of users) {
    const hashedPassword = await hash(u.password, 12);

    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        emailVerified: true,
        role: u.role,
        accounts: {
          create: {
            id: `${u.id}-account`,
            accountId: u.email,
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
    });

    console.log(`✓ ${u.email} (${u.role})`);
  }

  console.log("\nSeed completed!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
