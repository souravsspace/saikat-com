import Navbar from "@/components/navbar"
import { Separator } from "@/components/ui/separator"

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <div>
         <Navbar />
         <Separator className="my-4 sm:my-8" />
         <div className="mx:2 sm:mx-6">{children}</div>
      </div>
   )
}
