"use client"

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import LoginCard from "./components/login-card"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function Login() {
   const router = useRouter()
   const { status } = useSession()

   if (status === "authenticated") {
      return router.push("/")
   }

   return (
      <div>
         <Card className="max-w-3xl">
            <CardHeader>
               <CardTitle>Login</CardTitle>
               <CardDescription>
                  Enter your email below to login to your account
               </CardDescription>
            </CardHeader>

            <CardContent>
               <LoginCard />
            </CardContent>
         </Card>
      </div>
   )
}
