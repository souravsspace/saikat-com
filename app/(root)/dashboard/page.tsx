import Container from "@/components/ui/container"
import Heading from "@/components/ui/heading"
import UserDataCard from "./components/data-card"

export default function Dashboard({
   searchParams,
}: {
   searchParams?: { [key: string]: string | undefined }
}) {
   const userId = searchParams?.id!

   return (
      <div>
         <Container>
            <Heading
               title="Dashboard"
               subtitle="Manange all of your data here."
            />
            <div className="my-5">
               <UserDataCard />
            </div>
         </Container>
      </div>
   )
}
