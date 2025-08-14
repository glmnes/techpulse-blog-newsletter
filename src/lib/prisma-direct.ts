import { PrismaClient } from '@prisma/client'

declare global {
  var prismaDirect: PrismaClient | undefined
}

const prismaDirectClientSingleton = () => {
  // Use DIRECT_URL for mutations to avoid pooling issues
  const originalDatabaseUrl = process.env.DATABASE_URL
  process.env.DATABASE_URL = process.env.DIRECT_URL
  
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  
  // Restore original DATABASE_URL
  process.env.DATABASE_URL = originalDatabaseUrl
  
  return client
}

export const prismaDirect = global.prismaDirect ?? prismaDirectClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prismaDirect = prismaDirect
