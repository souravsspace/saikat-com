import Container from "@/components/ui/container"
import Heading from "@/components/ui/heading"
import DashboardsCard from "./components/data-card"
import prisma from "@/lib/prisma"

export default async function Dashboard({
   searchParams,
}: {
   searchParams?: { [key: string]: string | undefined }
}) {
   const userId = searchParams?.id!

   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      include: {
         purchaseDatas: true,
         orders: true,
      },
   })

   const purchasedDataFromUser = user?.purchaseDatas

   const orderedData = user?.orders.filter((order) => order.isPaid === true)

   console.log(orderedData)

   return (
      <div>
         <Container>
            <Heading
               title="Dashboard"
               subtitle="Manange all of your data here."
            />
            <div className="my-5 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
               {orderedData?.map((data) => (
                  <DashboardsCard
                     key={data.id}
                     data={data}
                     purchasedDataFromUser={
                        purchasedDataFromUser !== undefined
                           ? purchasedDataFromUser
                           : []
                     }
                  />
               ))}
            </div>
         </Container>
      </div>
   )
}
