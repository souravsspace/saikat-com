import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
} from "@/components/ui/card"
import { ORDER_TYPE } from "../../orders/components/columns"
import { format } from "date-fns"
import Link from "next/link"

interface purchasedDataFromUserType {
   id: string
   name: string | null
   email: string | null
   phone: number | null
   age: number | null
   address: string | null
   gender: string | null
   userId: string | null
}

type Props = {
   data: ORDER_TYPE
   purchasedDataFromUser: purchasedDataFromUserType[]
}

export default function DashboardsCard({ data }: Props) {
   return (
      <div>
         <Link href={`dashboard/${data.id}`}>
            <Card className="hover:bg-primary-foreground hover:translate-y-1 transition-all cursor-pointer">
               <CardHeader>
                  <CardDescription className="flex items-center justify-between">
                     <span className="text-base">Emails: {data.emails}</span>
                     <span>
                        {format(Number(data.createdAt), "MMMM do, yyyy")}
                     </span>
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <h3>
                     <span className="font-semibold">Includes :</span>{" "}
                     <span className="text-sm">
                        {data.phone && "Phone, "}
                        {data.address && "Address, "}
                        {data.age && "Age"}
                     </span>
                  </h3>
                  <h3>
                     <span className="font-semibold">Country :</span>{" "}
                     <span className="text-sm">{data.country}</span>
                  </h3>
               </CardContent>
            </Card>
         </Link>
      </div>
   )
}
