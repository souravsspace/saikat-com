import Container from "@/components/ui/container"
import Heading from "@/components/ui/heading"

export default function Dashboard({
   searchParams,
}: {
   searchParams?: { [key: string]: string | string[] | undefined }
}) {
   const userId = searchParams?.id

   return (
      <div>
         <Container>
            <Heading title="Dashboard" subtitle="Manange all of your data here." />
         </Container>
      </div>
   )
}
