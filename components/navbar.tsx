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
import { ModeToggle } from "./theme/mode-toggle"

function Navbar() {
   const { data: session, status } = useSession()
   const userId = session?.user?.id!

   return (
      <nav className="pt-4 sm:pt-8">
         <Container>
            <div className="flex justify-between items-center">
               <Link href="/">
                  <h2 className="uppercase">
                     <span className="text-3xl font-extrabold">hq</span>{" "}
                     <span className="text-primary-300 text-sm font-extralight">
                        dataleads
                     </span>
                  </h2>
               </Link>
               <ul className="flex items-center gap-4">
                  <li className="hidden sm:block">
                     <Link href="/service">Service</Link>
                  </li>
                  {status === "authenticated" ? (
                     <li className="hidden sm:block mr-6">
                        <Link href={`/dashboard?id=${userId}`}>Dashboard</Link>
                     </li>
                  ) : (
                     <li className="mr-6 hidden sm:block">
                        <Link href="/why-choose-us">Why choose us?</Link>
                     </li>
                  )}
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
                                 <Link
                                    href={`/dashboard?id=${userId}`}
                                    className="block sm:hidden"
                                 >
                                    <DropdownMenuItem>
                                       Dashboard
                                       <DropdownMenuShortcut>
                                          ⇧⌘D
                                       </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                 </Link>
                                 <Link href={`/orders?id=${userId}`}>
                                    <DropdownMenuItem>
                                       Orders
                                       <DropdownMenuShortcut>
                                          ⇧⌘P
                                       </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                 </Link>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem className="flex items-center justify-between">
                                    <span onClick={() => signOut()}>
                                       Logout
                                    </span>
                                    <ModeToggle />
                                 </DropdownMenuItem>
                              </DropdownMenuGroup>
                           </DropdownMenuContent>
                        </DropdownMenu>
                     ) : (
                        <Link href="/login">Login</Link>
                     )}
                  </li>
               </ul>
            </div>
            {/* <Separator className="my-4" /> */}
         </Container>
      </nav>
   )
}

export default Navbar
