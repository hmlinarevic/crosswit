import { PrismaClient } from "@prisma/client";

const globalForPrisma = typeof globalThis !== "undefined" ? globalThis : {};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
