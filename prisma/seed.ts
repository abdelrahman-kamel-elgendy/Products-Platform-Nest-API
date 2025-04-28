import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function createAdminUser() {
  const adminEmail = process.env.DB_ADMIN_PASSWORD!.trim().toLowerCase();
  const rawPassword = process.env.DB_ADMIN_PASSWORD!;

  const adminPassword = await argon.hash(rawPassword);

  // Check if admin already exists using transaction for safety
  return await prisma.$transaction(async (tx) => {
    const existingAdmin = await tx.user.findUnique({
      where: { email: adminEmail },
      select: {
        id: true,
        createdAt: true
      }
    });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      return console.log(existingAdmin);
    }

    const newAdmin = await tx.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    console.log('Admin user created successfully!');
    console.log(newAdmin);
  });
}

async function main() {
  try {
    await createAdminUser();
  } catch (error) {
    console.error('Failed to create admin user:', error);
    process.exitCode = 1;
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Script execution failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect().catch((e) => {
      console.error('Failed to disconnect Prisma:', e);
    });
  });