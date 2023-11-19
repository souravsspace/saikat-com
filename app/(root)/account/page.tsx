import Container from "@/components/ui/container"
import { ORDER_TYPE } from "./components/columns"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import OrderClient from "./components/client"

export const revalidate = 0

export default async function Account({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const userid = searchParams!.id as string

   const orders = await prisma.order.findMany({
      where: {
         userId: userid,
      },
   })

   const data: ORDER_TYPE[] = orders.map((order) => ({
      id: order.id,
      price: order.price,
      emails: order.emails,
      isPaid: order.isPaid,
      address: order.address,
      age: order.age,
      phone: order.phone,
      country: order.country,
      createdAt: format(order.createdAt, "MMMM do, yyyy"),
   }))

   return (
      <Container>
         <OrderClient data={data} />
      </Container>
   )
}
