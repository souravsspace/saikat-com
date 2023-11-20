"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {}

export default function UserDataCard({}: Props) {
   return (
      <div>
         <Card className="bg-gray-100">
            <CardHeader>
               <CardTitle>Sourav</CardTitle>
            </CardHeader>
            <CardContent>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
               tenetur modi aspernatur culpa distinctio illo quo vitae est amet
               facilis.
            </CardContent>
         </Card>
      </div>
   )
}
