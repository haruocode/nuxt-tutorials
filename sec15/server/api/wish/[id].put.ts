import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  const result = await prisma.wish.update({
    data: {
      title: body.title,
      granted: Boolean(Number(body.granted)),
    },
    where: {
      id: Number(id)
    }
  })

  return result
})
