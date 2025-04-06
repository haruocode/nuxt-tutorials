import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

const prisma = new PrismaClient()

// サーバー用Supabaseクライアント作成
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

  // トークンからユーザー情報を取得
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  const wish = await prisma.wish.create({
    data: {
      title: body.title,
      userId: user.id,
    },
  })

  return wish
})
