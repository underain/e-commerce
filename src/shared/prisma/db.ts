import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'

const db = new PrismaClient().$extends(withAccelerate())

export default db
