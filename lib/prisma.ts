import { PrismaClient } from "./prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Instância normal do Prisma (para operações de log que não devem ser auditadas)
export const dbRaw = 
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Instância com auditoria (para operações normais da aplicação)
export const db = new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = dbRaw;