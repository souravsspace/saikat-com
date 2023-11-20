"use client"

import Link from "next/link"
import Container from "@/components/ui/container"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

function Navbar() {
   const { data: session, status } = useSession()
   const userId = session?.user?.id!

   return (
      <nav className="pt-4 sm:pt-8">
         <Container>
            <div className="flex justify-between items-center">
               <h2 className="text-primary-100">
                  <Link href="/">
                     <Image
                        src="/logo.png"
                        alt="logo"
                        width={150}
                        height={150}
                        className="object-contain"
                     />
                  </Link>
               </h2>
               <ul className="flex items-center gap-3">
                  <li className="mr-5 hidden sm:block">
                     <Link href="/service">Service</Link>
                  </li>
                  <li>
                     {status === "authenticated" ? (
                        <DropdownMenu>
                           <DropdownMenuTrigger
                              asChild
                              className="cursor-pointer"
                           >
                              <Avatar>
                                 <AvatarImage src="" />
                                 <AvatarFallback className="uppercase">
                                    {session?.user?.name?.slice(0, 2)}
                                 </AvatarFallback>
                              </Avatar>
                           </DropdownMenuTrigger>
                           <DropdownMenuContent className="w-56">
                              <DropdownMenuLabel>My Account</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                 <Link href={`/account?id=${userId}`}>
                                    <DropdownMenuItem>
                                       Orders
                                       <DropdownMenuShortcut>
                                          ⇧⌘P
                                       </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                 </Link>
                                 <DropdownMenuItem onClick={() => signOut()}>
                                    Logout
                                    <DropdownMenuShortcut>
                                       ⌘L
                                    </DropdownMenuShortcut>
                                 </DropdownMenuItem>
                              </DropdownMenuGroup>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     ) : (
                        <Link href="/login">Login</Link>
                     )}
                  </li>
                  {status === "authenticated" ? (
                     <li className="hidden sm:block">
                        <Link href={`/dashboard?id=${userId}`}>Dashboard</Link>
                     </li>
                  ) : (
                     <>
                        <li className="hidden sm:block">
                           <Link href="/why-choose-us">Why choose us?</Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
            {/* <Separator className="my-4" /> */}
         </Container>
      </nav>
   )
}

export default Navbar
