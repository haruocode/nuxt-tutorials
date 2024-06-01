import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const wishlist = await prisma.wishlist.findFirst({
    where: {
      id: Number(id),
      isPublic: true,
    }
  })
  return {
    id: wishlist.id,
    title: wishlist.title,
  }
})
