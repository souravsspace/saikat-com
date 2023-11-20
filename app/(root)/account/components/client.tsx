"use client"

import Heading from "@/components/ui/heading"
import { DataTable } from "./data-table"
import { ORDER_TYPE, columns } from "./columns"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export const revalidate = 0

export default function OrderClient({ data }: { data: ORDER_TYPE[] }) {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) return null

   return (
      <div className="space-y-5">
         <div className="flex items-center justify-between">
            <Heading title="Orders" subtitle="All of your orders are here." />
            <Button variant="outline">Buy more</Button>
         </div>
         <DataTable searchKey="country" columns={columns} data={data!} />
      </div>
   )
}
