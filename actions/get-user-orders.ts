"use server"

import prisma from "@/lib/prisma"

export default async function getUserOrders(id: string) {
   const user = await prisma.user.findUnique({
      where: {
         id,
      },
      include: {
         orders: true,
      },
   })

   return user?.orders
}
