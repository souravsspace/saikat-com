"use client"

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import RegisterCard from "./components/register-card"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Register() {
   const router = useRouter()
   const { status } = useSession()

   if (status === "authenticated") {
      return router.push("/")
   }
   return (
      <div>
         <Card className="max-w-3xl">
            <CardHeader>
               <CardTitle>Register</CardTitle>
               <CardDescription>
                  Enter your email below to register to your account
               </CardDescription>
            </CardHeader>

            <CardContent>
               <RegisterCard />
            </CardContent>
         </Card>
      </div>
   )
}
