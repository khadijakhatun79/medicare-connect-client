import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    const { appointmentId, doctorName, fee } = body;

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", 

      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: `Doctor Appointment - ${doctorName}`,
            },
            unit_amount: fee * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        appointmentId,
      },

      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}