// Singleton Prisma client — reuses the same instance across hot reloads in dev
// Prisma 7 requires an explicit driver adapter; PrismaPg accepts a connection string
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(process.env.DATABASE_URL!),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
