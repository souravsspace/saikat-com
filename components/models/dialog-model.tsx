import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ORDER_TYPE } from "@/app/(root)/account/components/columns"
import PaymentReceipt from "../ui/receipt"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

type Props = {
   isOpen: boolean
   onOpen: () => void
   onClose: () => void
   title: string
   subtitle?: string
   submitBtn?: string
   data: ORDER_TYPE
}

export default function DialogModel({
   isOpen,
   onClose,
   onOpen,
   title,
   subtitle,
   submitBtn,
   data,
}: Props) {
   const downloadReceipt = () => {
      const pdf = new jsPDF()
      const element = document.getElementById("payment-receipt-container")!

      html2canvas(element).then((canvas) => {
         const imageData = canvas.toDataURL("image/png")

         pdf.addImage(imageData, "PNG", 10, 10, 190, 0)
         pdf.save("payment_receipt.pdf")
      })

      // const doc = new jsPDF("p", "mm", "a4")
      // autoTable(doc, {
      //    head: [
      //       [
      //          "Id",
      //          "Quantity",
      //          "Total",
      //          "Paid",
      //          "Phone",
      //          "Address",
      //          "Country",
      //          "Age",
      //       ],
      //    ],
      //    body: [
      //       [
      //          data.id,
      //          data.emails,
      //          data.price,
      //          data.isPaid,
      //          data.phone,
      //          data.address,
      //          data.country,
      //          data.age,
      //       ],
      //    ],
      // })

      // doc.html(data, {
      //    callback: function (doc) {
      //       // Save the PDF
      //       doc.save("document-html.pdf")
      //    },
      //    margin: [10, 10, 10, 10],
      //    autoPaging: "text",
      //    x: 0,
      //    y: 0,
      //    width: 190, //target width in the PDF document
      //    windowWidth: 675, //window width in CSS pixels
      // })

      // doc.save("receipt.pdf")
   }

   return (
      <Dialog open={isOpen} onOpenChange={onOpen}>
         <DialogContent className="max-w-4xl">
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               <DialogDescription>{subtitle}</DialogDescription>
            </DialogHeader>
            <div id="payment-receipt-container">
               <PaymentReceipt data={data} />
            </div>
            <DialogFooter>
               <Button variant="secondary" type="button" onClick={onClose}>
                  Cancel
               </Button>
               <Button type="submit" onClick={downloadReceipt}>
                  {submitBtn}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
