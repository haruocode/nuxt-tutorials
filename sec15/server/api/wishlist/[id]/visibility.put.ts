import { PrismaClient } from '@prisma/client'
import { serverSupabaseClient } from '#supabase/server'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  // 認証チェック
  const supabase = serverSupabaseClient(event)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  // ユーザーの所有するwishlistかチェック
  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    include: {
      wishlist: true
    }
  })

  if (!dbUser || !dbUser.wishlist || dbUser.wishlist.id !== Number(id)) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden'
    })
  }

  const result = await prisma.wishlist.update({
    data: {
      isPublic: Boolean(body.isPublic),
    },
    where: {
      id: Number(id)
    }
  })

  return result
})
