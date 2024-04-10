import { PrismaClient } from '@prisma/client'
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();
async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            password: hashSync('test', 12),
        },
    })
    const user2 = await prisma.user.upsert({
        where: { email: 'admin@mmi.fr' },
        update: {},
        create: {
            email: 'admin@mmi.fr',
            password: hashSync('test', 12),
        },
    })
    const category = await prisma.category.upsert({
        where: { name: 'Acétate'},
        update: {},
        create: {
            name: 'Acétate'
        }
    })
    const product = await prisma.product.upsert({
        where: { name: 'Anne'},
        update: {},
        create: {
            name: 'Anne',
            categoryId: 1
        }
    })
    const variant = await prisma.variant.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'Anne 101',
            productId: 1
        }
    })
    console.log({ user1, user2 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
