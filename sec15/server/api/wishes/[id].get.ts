import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const wishes = await prisma.wish.findMany({
    where: {
      wishlistId: Number(id),
    }
  })
  return wishes
})
