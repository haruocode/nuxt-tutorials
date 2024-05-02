import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  // TODO: ページネーション
  const wishlist = await prisma.wishlist.findMany({
    where: {
      isPublic: true,
    }
  })
  return wishlist.map((row) => ({
    id: row.id,
    title: row.title,
  }))
})
