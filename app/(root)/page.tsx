import EmailSection from "@/components/email-section"
import Container from "@/components/ui/container"
import prisma from "@/lib/prisma"

export default async function HomePage() {
   const data = await prisma.data.findMany()
   const country = data.map((item) => item.country)

   const filteredCountry = country.filter(
      (item, index) => country.indexOf(item) === index
   )

   return (
      <main>
         <Container>
            <EmailSection filteredCountry={filteredCountry!} />
         </Container>
      </main>
   )
}
