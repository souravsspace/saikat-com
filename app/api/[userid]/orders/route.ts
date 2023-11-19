import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET({ params }: { params: { userid: string } }) {
   const { userid } = params

   if (!userid) {
      return NextResponse.json(
         { error: "User ID is required" },
         { status: 400 }
      )
   }

   const user = await prisma.user.findUnique({
      where: {
         id: userid,
      },
   })

   if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 })

   const orders = await prisma.order.findMany({
      where: {
         userId: userid,
      },
   })

   return NextResponse.json(orders, { status: 200 })
}
