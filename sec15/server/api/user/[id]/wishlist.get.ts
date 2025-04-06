import { PrismaClient } from '@prisma/client'
import { useSupabaseServer } from '#supabase/server'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
  // 認証チェック
  const supabase = useSupabaseServer(event)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  // ユーザーのメールアドレスでDBから情報を取得
  const dbUser = await prisma.user.findUnique({
    where: {
      email: user.email
    },
    include: {
      wishlist: true
    }
  })

  if (!dbUser || !dbUser.wishlist) {
    throw createError({
      statusCode: 404,
      message: 'Wishlist not found'
    })
  }

  return dbUser.wishlist
})
