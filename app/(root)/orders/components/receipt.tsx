import { ORDER_TYPE } from "@/app/(root)/orders/components/columns"

type Props = {
   data: ORDER_TYPE
}

function PaymentReceipt({ data }: Props) {
   return (
      <div className="w-full h-full p-2">
         <div className="text-right mb-2">
            <h1 className="text-4xl font-bold mb-4">Payment receipt</h1>
            <p className="text-base font-light">Order ID: {data.id}</p>
            <p className="text-base font-light">Quantity: {data.emails}</p>
         </div>
         <hr className="my-4" />

         <div className="mt-5">
            <h2 className="text-xl">Order Items:</h2>
            <p className="text-lg font-medium">Emails : {data.emails} pieces</p>
            <div className="ml-8">
               <p className="text-base ml-4">WITH - </p>
               <ul className="list-disc ml-8 text-sm">
                  {data.address && <li>Address</li>}
                  {data.phone && <li>Phone</li>}
                  {data.country && <li>Country</li>}
                  {data.age && <li>Age</li>}
               </ul>
            </div>
         </div>

         <div className="mt-10">
            <hr className="my-4" />
            <h4 className="text-base text-right">Total Paid ${data.price}</h4>
         </div>
      </div>
   )
}

export default PaymentReceipt
