"use client"

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dispatch, SetStateAction } from "react"

interface EmailPricingCardProps {
   country: string
   setCountry: Dispatch<SetStateAction<string>>
   phone: boolean
   setPhone: Dispatch<SetStateAction<boolean>>
   address: boolean
   setAddress: Dispatch<SetStateAction<boolean>>
   age: boolean
   setAge: Dispatch<SetStateAction<boolean>>
   emailCount: number
   setEmailCount: Dispatch<SetStateAction<number>>
   phonePrice: number
   addressPrice: number
   agePrice: number
   countryList: (string | null)[]
}

export function EmailPricingCard(props: EmailPricingCardProps) {
   return (
      <Card className="flex-1">
         <CardHeader>
            <CardTitle>Email Verification Prices</CardTitle>
         </CardHeader>
         <CardContent className="space-y-5 mt-4">
            <div>
               <Label>How many emails do you want to verify</Label>
               <Input
                  type="number"
                  min={100}
                  max={Infinity}
                  value={props.emailCount}
                  onChange={(e) => props.setEmailCount(Number(e.target.value))}
               />
            </div>
            <div>
               <Label>Country</Label>
               <div>
                  <Select
                     defaultValue={props.country}
                     onValueChange={props.setCountry}
                  >
                     <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {props.countryList.map((country) => (
                              <SelectItem key={country} value={country!}>
                                 {country}
                              </SelectItem>
                           ))}
                           <SelectItem value="usa">
                              {" "}
                              United States (USA)
                           </SelectItem>
                           <SelectItem value="uk">
                              United Kingdom (UK)
                           </SelectItem>
                           <SelectItem value="ca">Canada (CA)</SelectItem>
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               </div>
            </div>
         </CardContent>
         <CardFooter className="mt-5">
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-between items-center">
               <span className="flex items-center gap-2">
                  <Checkbox
                     id="phone"
                     onCheckedChange={() => props.setPhone((prev) => !prev)}
                     defaultChecked={props.phone}
                  />
                  <Label className="text-sm sm:text-base" htmlFor="phone">
                     Phone ${props.phonePrice}
                  </Label>
               </span>
               <span className="flex items-center gap-2">
                  <Checkbox
                     id="address"
                     onCheckedChange={() => props.setAddress((prev) => !prev)}
                     defaultChecked={props.address}
                  />
                  <Label className="text-sm sm:text-base" htmlFor="address">
                     Street Address ${props.addressPrice}
                  </Label>
               </span>
               <span className="flex items-center gap-2">
                  <Checkbox
                     id="age"
                     onCheckedChange={() => props.setAge((prev) => !prev)}
                     defaultChecked={props.age}
                  />
                  <Label className="text-sm sm:text-base" htmlFor="age">
                     Age ${props.agePrice}
                  </Label>
               </span>
            </div>
         </CardFooter>
      </Card>
   )
}
