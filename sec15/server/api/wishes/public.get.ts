import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const limit = parseInt(query.limit as string) || 10
  const offset = parseInt(query.offset as string) || 0

  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: 'desc' },
    skip: offset,
    take: limit,
  })

  return wishes
})
