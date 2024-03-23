# TODOアプリ with Nuxt+Prisma+Supabase

よかったらどうぞ。

## prisma/schema.prisma

```
model Todos {
  id          Int      @id @default(autoincrement())
  task        String
  isComplete  Boolean
  createdAt   DateTime @default(now()) @db.Timestamptz(6)
  updatedAt   DateTime @updatedAt
}
```

## prisma/seed.ts

```
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function seedTodos() {
  try {

    await prisma.todos.create({
      data: {
        task: "顔を洗う",
        isComplete: false
      },
    })

    await prisma.todos.create({
      data: {
        task: "歯を磨く",
        isComplete: false
      },
    })

    await prisma.todos.create({
      data: {
        task: "酒を煮切る",
        isComplete: false
      },
    })
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTodos()
```
