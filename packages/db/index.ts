// import { PrismaClient } from "./generated/prisma/client"
// import { withAccelerate } from '@prisma/extension-accelerate'
// export const prisma = new PrismaClient().$extend(withAccelerate())
// import secrets from '@repo/secrets'
import { PrismaPg } from '@prisma/adapter-pg'

// import { PrismaClient } from './generated/prisma/client'
// export const prisma = new PrismaClient({
//   adapter: new PrismaPg({
//     database : secrets.DATABASE_URL
//   })
// })

import { PrismaClient } from './generated/prisma/client'

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

export default prisma;