import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
  { auth: { persistSession: false } }
)

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'No token' })
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const id = getRouterParam(event, 'id')

  const wish = await prisma.wish.findUnique({
    where: { id: Number(id) },
  })

  if (!wish || wish.userId !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  await prisma.wish.delete({
    where: { id: Number(id) },
  })

  return { message: 'Wish deleted successfully' }
})
