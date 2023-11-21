import Stripe from "stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
   const body = await request.text()
   const signature = headers().get("Stripe-signature") as string

   let event: Stripe.Event

   try {
      event = stripe.webhooks.constructEvent(
         body,
         signature,
         process.env.STRIPE_WEBHOOK_SECRET!
      )
   } catch (error: any) {
      return new NextResponse(`Webhook error : ${error?.message}`, {
         status: 400,
      })
   }


   const session = event.data.object as Stripe.Checkout.Session

   if (event.type == "checkout.session.completed") {
      const order = await prisma.order.update({
         where: {
            id: session?.metadata?.orderId,
         },
         data: {
            isPaid: true,
         },
      })

      const getDataFromServer = await prisma.data.findMany({
         take: order.emails,
      })

      await prisma.blackListData.createMany({
         data: getDataFromServer.map((data) => ({
            serverDataId: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            zip: data.zip,
            phone: data.phone,
            age: data.age,
            carrier: data.carrier,
            gender: data.gender,
            ethnicity: data.ethnicity,
            ownrent: data.ownrent,
            latitude: data.latitude,
            longitude: data.longitude,
         })),
      })

      await prisma.purchaseData.createMany({
         data: getDataFromServer.map((data) => ({
            name: `${data.first_name!} ${data.last_name!}`,
            email: data.email != null ? data.email : "",
            address:
               order.address !== false
                  ? `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zip}`
                  : null,
            phone: order.phone !== false ? data.phone! : null,
            age: order.age !== false ? data.age! : null,
            gender: data.gender!,
            userId: order.userId,
            orderId: order.id,
         })),
      })

      await prisma.data.deleteMany({
         where: {
            id: {
               in: getDataFromServer.map((data) => data.id),
            },
         },
      })
   }

   return new NextResponse(null, { status: 200 })
}
