"use client"

import {
   ColumnDef,
   ColumnFiltersState,
   getFilteredRowModel,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   useReactTable,
   SortingState,
   getSortedRowModel,
   VisibilityState,
} from "@tanstack/react-table"

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"

import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
   searchKey: string
}

export function DataTable<TData, TValue>({
   columns,
   data,
   searchKey,
}: DataTableProps<TData, TValue>) {
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   const [sorting, setSorting] = useState<SortingState>([])

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         columnFilters,
         sorting,
         columnVisibility,
      },
   })

   return (
      <div>
         <div className="flex items-center py-4">
            <Input
               placeholder="Search via emails..."
               value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
               }
               onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                     Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }
                           >
                              {column.id}
                           </DropdownMenuCheckboxItem>
                        )
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                      )}
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <div className="flex items-center justify-end space-x-2 py-4">
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               Next
            </Button>
         </div>
      </div>
   )
}
