import prisma from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"
import Stripe from "stripe"

const origin = process.env.NEXT_PUBLIC_URL

type RequestJsonType = {
   country: string
   phone: boolean
   address: boolean
   age: boolean
   emailCount: number
   total: number
   id: string | undefined
}

export async function POST(request: Request) {
   const {
      country,
      phone,
      address,
      age,
      emailCount,
      total,
      id,
   }: Partial<RequestJsonType> = await request.json()

   const order = await prisma.order.create({
      data: {
         emails: Number(emailCount),
         isPaid: false,
         price: Number(total),
         age,
         address,
         country: !country || country === "" ? "usa" : country,
         phone,
         user: {
            connect: {
               id,
            },
         },
      },
   })
   // return NextResponse.json(order, { status: 200 })

   const line_item: Stripe.Checkout.SessionCreateParams.LineItem[] = []

   const roundedTotal = Math.round(total!)

   line_item.push({
      quantity: emailCount,
      price_data: {
         currency: "usd",
         product_data: {
            name: "Emails and other data",
         },
         unit_amount: roundedTotal,
      },
   })

   console.log("line_item", line_item)

   const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
         enabled: true,
      },
      success_url: `${origin}?success=1`,
      cancel_url: `${origin}?cancel=1`,
      metadata: {
         order_id: order.id,
      },
   })

   console.log(session)

   return NextResponse.json({ url: session.url }, { status: 200 })
}
