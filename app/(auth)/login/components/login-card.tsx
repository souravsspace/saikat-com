"use client"

import z from "zod"
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const schema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
   password: z
      .string()
      .min(8, {
         message: "Password must be at least 8 characters long",
      })
      .max(255, {
         message: "Password must be at most 255 characters long",
      }),
})

type formType = z.infer<typeof schema>

export default function LoginCard() {
   const router = useRouter()

   const form = useForm<formType>({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: zodResolver(schema),
   })

   const { data: session } = useSession()
   const userId = session?.user?.id!

   const onSubmit = async (data: formType) => {
      try {
         const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
         })

         if (res?.error) {
            toast.error("Invalid email or password!")
         }

         if (res?.ok) {
            router.push(`/dashboard?id=${userId}`)
            toast.success("Login successful!")
         }
      } catch (error) {
         toast.error("Something went wrong!")
      }
   }

   return (
      <div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              placeholder="Your email"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <h4 className="font-light">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-normal cursor-pointer">
                     Create here
                  </Link>
               </h4>

               <Button type="submit" className="w-full">
                  Login
               </Button>
            </form>
         </Form>
      </div>
   )
}
