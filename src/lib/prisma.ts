import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  // Get the database URL and add pgbouncer parameters if not already present
  const databaseUrl = process.env.DATABASE_URL || ''
  
  // Check if we're using the pooler (contains 'pooler.supabase.com')
  const isUsingPooler = databaseUrl.includes('pooler.supabase.com')
  
  // If using pooler and statement_cache_size is not set, add it
  if (isUsingPooler && !databaseUrl.includes('statement_cache_size')) {
    const url = new URL(databaseUrl)
    url.searchParams.set('statement_cache_size', '0')
    process.env.DATABASE_URL = url.toString()
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = global.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
