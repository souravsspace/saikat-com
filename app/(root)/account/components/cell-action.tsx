"use client"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, Download, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { ORDER_TYPE } from "./columns"
import { deleteOrderHistory } from "@/actions/delete-order-history"
import { useDialog } from "@/hooks/use-dialog"
import DialogModel from "@/components/models/dialog-model"

interface CellActionProps {
   data: ORDER_TYPE
}

export default function CellAction({ data }: CellActionProps) {
   const { isOpen, onOpen, onClose } = useDialog()

   const onCopy = (id: string) => {
      navigator.clipboard.writeText(id)
      toast.success("Copied to clipboard")
   }

   const onDelete = async () => {
      try {
         await deleteOrderHistory(data.id)
         toast.success("Order Deleted!")
         window.location.reload()
      } catch (error) {
         toast.error("Failed to delete order")
      }
   }

   const viewReceipt = () => {
      onOpen()
   }

   return (
      <div className="mx-2 sm:mx-6">
         <DialogModel
            title="Receipt"
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            submitBtn="Download"
            data={data}
         />
         <DropdownMenu>
            <DropdownMenuTrigger>
               <Button variant="ghost">
                  <MoreHorizontal className="h-5 w-5 p-0" />
                  <span className="sr-only">Open</span>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
               <DropdownMenuLabel>Action</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem onClick={() => onCopy(data.id)}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Id
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => onDelete()}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
               </DropdownMenuItem>
               {/* {data.isPaid && ( */}
               <DropdownMenuItem onClick={() => viewReceipt()}>
                  <Download className="h-4 w-4 mr-2" />
                  View Receipt
               </DropdownMenuItem>
               {/* )} */}
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   )
}
