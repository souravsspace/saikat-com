"use client"

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import SummaryCard from "./summary-card"
import { Button } from "./ui/button"
import { EmailPricingCard } from "./email-pricing-card"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

interface EmailSectionProps {
   filteredCountry: (string | null)[]
}

export default function EmailSection({ filteredCountry }: EmailSectionProps) {
   const searchParams = useSearchParams()

   const [loading, setLoading] = useState(false)

   const [country, setCountry] = useState("")
   const [phone, setPhone] = useState(false)
   const [address, setAddress] = useState(false)
   const [age, setAge] = useState(false)

   const [emailCount, setEmailCount] = useState(100)

   const priceOfPhone = 15
   const priceOfAddress = 10
   const priceOfAge = 20

   const phonePrice = phone ? priceOfPhone : 0
   const addressPrice = address ? priceOfAddress : 0
   const agePrice = age ? priceOfAge : 0
   const emailPerUnitPrice = 0.05

   const priceOfEmails = emailCount * emailPerUnitPrice

   const total = phonePrice + addressPrice + agePrice + priceOfEmails

   const session = useSession()

   useEffect(() => {
      if (searchParams.get("success")) {
         toast.success("Payment Successful!")
      }

      if (searchParams.get("cancel")) {
         toast.error("Payment Cancelled!")
      }
   }, [searchParams])

   const data = {
      country,
      phone,
      address,
      age,
      emailCount,
      total,
      id: session.data?.user?.id,
   }

   const handleCheckout = async () => {
      try {
         setLoading(true)
         const res = await axios.post("/api/checkout", data)

         window.location = res.data.url
      } catch (error) {
         toast.error("Something went wrong!")
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="flex gap-2 flex-col lg:flex-row">
         <EmailPricingCard
            country={country}
            setCountry={setCountry}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            age={age}
            setAge={setAge}
            emailCount={emailCount}
            setEmailCount={setEmailCount}
            phonePrice={priceOfPhone}
            addressPrice={priceOfAddress}
            agePrice={priceOfAge}
            countryList={filteredCountry}
         />
         <Card className="flex-1">
            <CardHeader>
               <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 mt-4">
               <SummaryCard
                  total={total}
                  phonePrice={phonePrice}
                  addressPrice={addressPrice}
                  agePrice={agePrice}
                  priceOfEmails={priceOfEmails}
                  totalEmails={emailCount}
               />
            </CardContent>
            <CardFooter className="flex justify-end">
               <Button
                  disabled={loading}
                  onClick={handleCheckout}
                  className="w-full lg:w-auto"
               >
                  Buy Now
               </Button>
            </CardFooter>
         </Card>
      </div>
   )
}
