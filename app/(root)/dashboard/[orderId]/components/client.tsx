"use client"

import Heading from "@/components/ui/heading"
import { DataTable } from "./data-table"
import { PURCHASE_TYPE, columns } from "./columns"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

export const revalidate = 0

export default function PurchaseClient({ data }: { data: PURCHASE_TYPE[] }) {
   const [isMounted, setIsMounted] = useState(false)

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) return null

   function onDownloadPDF() {
      const doc = new jsPDF()

      const tableData = data.map((item) => [
         item.id,
         item.name ? item.name : "N/A",
         item.email ? item.email : "N/A",
         item.phone ? item.phone : "N/A",
         item.age ? item.age : "N/A",
         item.address ? item.address : "N/A",
         item.gender ? item.gender : "N/A",
      ])

      autoTable(doc, {
         head: [["Id", "Name", "Email", "Phone", "Age", "Address", "Gender"]],
         body: tableData,
      })
      doc.save("data.pdf")
   }

   function onDownloadSheet() {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet("Sheet", {
         properties: { tabColor: { argb: "FFC0000" } },
      })

      worksheet.properties.defaultColWidth = 40
      worksheet.properties.defaultRowHeight = 90

      const headerRow = ["Name", "Email", "Phone", "Age", "Gender", "Address"]

      worksheet.addRow(headerRow)

      data.forEach((item) => {
         const rowData = [
            item.name || "N/A",
            item.email || "N/A",
            item.phone !== null ? item.phone.toString() : "N/A",
            item.age !== null ? item.age.toString() : "N/A",
            item.gender || "N/A",
            item.address || "N/A",
         ]

         worksheet.addRow(rowData)
      })

      workbook.xlsx.writeBuffer().then((buffer) => {
         const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
         })
         const fileName = "data.xlsx"
         saveAs(blob, fileName)
      })
   }

   return (
      <div className="space-y-5">
         <div className="flex items-center justify-between">
            <Heading title="Purchased Data" subtitle="" />

            <DropdownMenu>
               <DropdownMenuTrigger>
                  <Button variant="outline">
                     <span>View</span>
                     <Download className="h-5 w-5 ml-3" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuLabel>Download</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onDownloadPDF()}>
                     <FileText className="h-4 w-4 mr-2" />
                     PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownloadSheet()}>
                     <FileSpreadsheet className="h-4 w-4 mr-2" />
                     SHEET
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <DataTable searchKey="email" columns={columns} data={data!} />
      </div>
   )
}
