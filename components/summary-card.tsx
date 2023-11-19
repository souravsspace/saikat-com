type Props = {
   country: string
   phone: boolean
   address: boolean
   age: boolean
   addressPrice: number
   phonePrice: number
   agePrice: number
   emailCount: number
   emailPerUnitPrice: number
}

function SummaryCard({
   country,
   phone,
   address,
   age,
   addressPrice,
   phonePrice,
   agePrice,
   emailCount,
   emailPerUnitPrice,
}: Props) {
   const showAddress = address ? addressPrice : 0
   const showPhone = phone ? phonePrice : 0
   const showAge = age ? agePrice : 0
   const showEmail = emailCount * emailPerUnitPrice

   const total = showAddress + showPhone + showAge + showEmail
   return (
      <div>
         <div className="space-y-2">
            {phone && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Phone</h3>
                  <h3 className="text-lg font-medium">
                     ${phonePrice.toFixed(2)}
                  </h3>
               </div>
            )}
            {age && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Age</h3>
                  <h3 className="text-lg font-medium">
                     ${agePrice.toFixed(2)}
                  </h3>
               </div>
            )}
            {address && (
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Address</h3>
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
