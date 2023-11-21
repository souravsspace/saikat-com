"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "@/app/(root)/orders/components/cell-action"

export type ORDER_TYPE = {
   id: string
   price: number
   emails: number
   isPaid: boolean
   address: boolean
   age: boolean
   phone: boolean
   country: string
   userId: string
   createdAt: Date | string
}

export const columns: ColumnDef<ORDER_TYPE>[] = [
   {
      accessorKey: "id",
      header: "Order Id",
   },
   {
      accessorKey: "emails",
      header: "Emails",
   },
   {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>${row.original.price}</span>,
   },
   {
      accessorKey: "isPaid",
      header: "Paid",
   },
   {
      accessorKey: "address",
      header: "Address",
   },
   {
      accessorKey: "age",
      header: "Age",
   },
   {
      accessorKey: "phone",
      header: "Phone",
   },
   {
      accessorKey: "country",
      header: "Country",
   },
   {
      accessorKey: "createdAt",
      header: "Date",
   },
   {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => <CellAction data={row.original} />,
   },
]
