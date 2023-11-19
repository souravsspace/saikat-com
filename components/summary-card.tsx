type Props = {
   total: number
   phonePrice: number
   addressPrice: number
   agePrice: number
   priceOfEmails: number
   totalEmails: number
}

function SummaryCard({
   total,
   phonePrice,
   addressPrice,
   agePrice,
   priceOfEmails,
   totalEmails,
}: Props) {
   return (
      <div>
         <div className="space-y-2">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-medium">Emails - ({totalEmails})</h3>
               <h3 className="text-lg font-medium">
                  ${priceOfEmails.toFixed(2)}
               </h3>
            </div>
            {phonePrice !== 0 && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <h3 className="text-lg font-medium">
                     ${phonePrice.toFixed(2)}
                  </h3>
               </div>
            )}
            {agePrice !== 0 && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Age</h3>
                  <h3 className="text-lg font-medium">
                     ${agePrice.toFixed(2)}
                  </h3>
               </div>
            )}
            {addressPrice !== 0 && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Street Address</h3>
                  <h3 className="text-lg font-medium">
                     ${addressPrice.toFixed(2)}
                  </h3>
               </div>
            )}
         </div>

         <hr className="my-3" />

         <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total</h3>
            <h3 className="text-xl font-semibold">${total.toFixed(2)}</h3>
         </div>
      </div>
   )
}

export default SummaryCard
