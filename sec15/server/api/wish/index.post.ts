import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const result = await prisma.wish.create({
    data: {
      wishlistId: Number(body.wishlistId),
      title: body.title,
      granted: false,
    },
  })
  return result
})
