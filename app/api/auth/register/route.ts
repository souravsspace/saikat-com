import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
   const body = await request.json()
   const { name, email, password } = body

   if (!name || !email || !password) {
      return NextResponse.json(
         { message: "Missing name, email or password" },
         { status: 400 }
      )
   }

   const existingUser = await prisma.user.findUnique({
      where: { email },
   })

   if (existingUser)
      return NextResponse.json(
         { message: "User with this email already exists" },
         { status: 400 }
      )

   const hashedPassword = await bcrypt.hash(password, 10)

   try {
      const user = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         },
      })
      console.log(user)
      return NextResponse.json({ user })
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      )
   }
}
