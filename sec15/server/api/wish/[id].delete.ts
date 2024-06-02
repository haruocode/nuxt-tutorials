import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const result = await prisma.wish.delete({
    where: {
      id: Number(id),
    }
  })
  return result
})
