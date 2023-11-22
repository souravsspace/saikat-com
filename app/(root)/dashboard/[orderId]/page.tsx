import Container from "@/components/ui/container"
import prisma from "@/lib/prisma"
import PurchaseClient from "./components/client"

export const revalidate = 0

type Props = {
   params: {
      orderId: string
   }
}

export default async function DataPage({ params: { orderId } }: Props) {
   const getPurchasedData = await prisma.purchaseData.findMany({
      where: {
         orderId: orderId,
      },
      orderBy: {
         name: "asc",
      },
   })

   return (
      <div>
         <Container>
            <PurchaseClient data={getPurchasedData} />
         </Container>
      </div>
   )
}
