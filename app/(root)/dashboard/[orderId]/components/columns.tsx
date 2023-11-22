"use client"

import { ColumnDef } from "@tanstack/react-table"
import toast from "react-hot-toast"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Name
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
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
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Email
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
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
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Phone
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
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
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Age
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => (
         <span>{row.original?.age ? row.original?.age : "N/A"}</span>
      ),
   },
   {
      accessorKey: "address",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Address
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
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
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
            >
               Gender
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
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
