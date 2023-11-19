"use client"

import Heading from "@/components/ui/heading"
import { DataTable } from "./data-table"
import { ORDER_TYPE, columns } from "./columns"
import { useEffect, useState } from "react"

export const revalidate = 0

export default function OrderClient({ data }: { data: ORDER_TYPE[] }) {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) return null

   return (
      <div className="space-y-5">
         <Heading title="Orders" subtitle="All of your orders are here." />
         <DataTable searchKey="country" columns={columns} data={data!} />
      </div>
   )
}
