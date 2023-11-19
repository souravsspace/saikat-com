"use client"

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import SummaryCard from "./summary-card"
import { Button } from "./ui/button"
import { EmailPricingCard } from "./email-pricing-card"

export default function EmailPricingSection() {
   const [country, setCountry] = useState("usa")
   const [phone, setPhone] = useState(false)
   const [address, setAddress] = useState(false)
   const [age, setAge] = useState(false)

   const [emailCount, setEmailCount] = useState(100)
   const phonePrice = 15
   const addressPrice = 10
   const agePrice = 20
   const emailPerUnitPrice = 0.05

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
            phonePrice={phonePrice}
            addressPrice={addressPrice}
            agePrice={agePrice}
         />
         <Card className="flex-1">
            <CardHeader>
               <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 mt-4">
               <SummaryCard
                  country={country}
                  phone={phone}
                  address={address}
                  age={age}
                  addressPrice={addressPrice}
                  phonePrice={phonePrice}
                  agePrice={agePrice}
                  emailCount={emailCount}
                  emailPerUnitPrice={emailPerUnitPrice}
               />
            </CardContent>
            <CardFooter>
               <Button>Buy Now</Button>
            </CardFooter>
         </Card>
      </div>
   )
}
