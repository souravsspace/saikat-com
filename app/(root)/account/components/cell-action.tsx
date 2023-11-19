import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { ORDER_TYPE } from "./columns"

interface CellActionProps {
   data: ORDER_TYPE
}

export default function CellAction({ data }: CellActionProps) {
   const onCopy = (id: string) => {
      navigator.clipboard.writeText(id)
      toast.success("Copied to clipboard")
   }

   const onDelete = async () => {}

   return (
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
            <DropdownMenuItem>
               <Trash className="h-4 w-4 mr-2" />
               Delete
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
