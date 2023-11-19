"use server"

import prisma from "@/lib/prisma"

export async function deleteOrderHistory(userId: string) {
   if (!userId) throw new Error("User ID is required")

   console.log("Deleting order history for user", userId)

   const res = await prisma.order.delete({
      where: {
         id: userId,
      },
   })

   return res
}
