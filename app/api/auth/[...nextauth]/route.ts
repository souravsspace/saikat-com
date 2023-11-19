import prisma from "@/prisma/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import nextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const handler = nextAuth({
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "email:",
               type: "text",
               placeholder: "email",
            },
            password: {
               label: "Password:",
               type: "password",
            },
         },
         async authorize(credentials) {
            const email = credentials?.email as string
            const password = credentials?.password as string

            console.log(email, password)

            if (!email || !password) return null

            const user = await prisma.user.findUnique({
               where: {
                  email,
               },
            })

            if (!user) return null

            const comparePassword = await bcrypt.compare(
               password,
               user.password
            )

            if (!comparePassword) return null

            return user
         },
      }),
   ],
   adapter: PrismaAdapter(prisma),
   secret: process.env.NEXTAUTH_SECRET,
   pages: {
      signIn: "/",
   },
   session: {
      strategy: "jwt",
   },
   jwt: {
      secret: process.env.NEXTAUTH_SECRET,
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) token.id = user.id
         return token
      },
      async session({ session, token }) {
         if (session?.user) {
            session.user.id = token.id
         }
         return session
      },
   },
})

export { handler as GET, handler as POST }
