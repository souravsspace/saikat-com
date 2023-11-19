import Container from "@/components/ui/container"
import Heading from "@/components/ui/heading"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"
import getUserOrders from "@/actions/get-user-orders"

export default async function Account({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const userid = searchParams?.id
   const res = await getUserOrders(String(userid))

   // console.log(res)

   return (
      <Container>
         <div className="space-y-5">
            <Heading title="Orders" subtitle="All of your orders are here." />
            {/* <DataTable columns={columns} data={data!} /> */}
         </div>
      </Container>
   )
}
