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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const schema = z
   .object({
      name: z
         .string()
         .min(2, {
            message: "Name must be at least 2 characters long",
         })
         .max(255, {
            message: "Name must be at most 255 characters long",
         }),
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
      confirmPassword: z
         .string()
         .min(8, {
            message: "Password must be at least 8 characters long",
         })
         .max(255, {
            message: "Password must be at most 255 characters long",
         }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   })

type formType = z.infer<typeof schema>

export default function RegisterCard() {
   const router = useRouter()

   const form = useForm<formType>({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: zodResolver(schema),
   })

   const onSubmit = async (data: formType) => {
      try {
         await axios.post("/api/auth/register", data)
         toast.success("Account created successfully. Please login.")
         router.push("/login")
      } catch (error) {
         toast.error("Something went wrong. Please try again later.")
      }
   }

   return (
      <div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              placeholder="Your Name"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              type="text"
                              placeholder="Your Email"
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
               <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                           <Input
                              type="password"
                              placeholder="Enter your password again"
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <div className="flex items-center space-x-2">
                  <Checkbox id="terms" defaultChecked required />
                  <Label
                     htmlFor="terms"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Accept terms and conditions
                  </Label>
               </div>

               <h4 className="font-light">
                  Already have an account?{" "}
                  <Link href="/login" className="font-normal cursor-pointer">
                     Login here
                  </Link>
               </h4>

               <Button type="submit" className="w-full">
                  Register
               </Button>
            </form>
         </Form>
      </div>
   )
}
