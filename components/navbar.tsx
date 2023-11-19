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

function Navbar() {
   const { data: session, status } = useSession()

   return (
      <nav className="py-4 sm:py-8">
         <Container>
            <div className="flex justify-between items-center">
               <h2 className="text-primary-100">
                  <Link href="/">HQ Dataleads</Link>
               </h2>
               <ul className="flex items-center gap-3">
                  <li>
                     <Link href="/service">Service</Link>
                  </li>
                  <li>
                     <Link href="/why-choose-us">Why choose us?</Link>
                  </li>
                  <li>
                     {status === "authenticated" ? (
                        <DropdownMenu>
                           <DropdownMenuTrigger asChild>
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
                                 <Link href="account">
                                    <DropdownMenuItem>
                                       Profile
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
                     ""
                  ) : (
                     <li>
                        <Link href="/account">Account</Link>
                     </li>
                  )}
               </ul>
            </div>
         </Container>
      </nav>
   )
}

export default Navbar
