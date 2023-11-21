"use client"

import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"

export type PURCHASE_TYPE = {
   id: string
   name: string | null
   email: string | null
   phone: number | null
   age: number | null
   address: string | null
   gender: string | null
   userId: string | null
   orderId: string
}

const onCopy = (value: string) => {
   navigator.clipboard.writeText(value)
   toast.success("Copied to clipboard")
}

export const columns: ColumnDef<PURCHASE_TYPE>[] = [
   {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
         <span
            className="cursor-copy"
            onClick={() => onCopy(row.original?.name!)}
         >
            {row.original?.name ? row.original?.name : "N/A"}
         </span>
      ),
   },
   {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
         <span
            className="cursor-copy"
            onClick={() => onCopy(row.original?.email!)}
         >
            {row.original?.email ? row.original?.email : "N/A"}
         </span>
      ),
   },
   {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
         <span
            className="cursor-copy"
            onClick={() => onCopy(String(row.original?.phone)!)}
         >
            {row.original?.phone ? row.original?.phone : "N/A"}
         </span>
      ),
   },
   {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
         <span>{row.original?.age ? row.original?.age : "N/A"}</span>
      ),
   },
   {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
         <span
            className="cursor-copy"
            onClick={() => onCopy(row.original?.address!)}
         >
            {row.original?.address ? row.original?.address : "N/A"}
         </span>
      ),
   },
   {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
         <>
            {row.original?.name ? (
               <span>{row.original?.name === "M" ? "Male" : "Female"}</span>
            ) : (
               "N/A"
            )}
         </>
      ),
   },
]
