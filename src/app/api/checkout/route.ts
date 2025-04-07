import { CartItem } from "../../../context/CartContext";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface checkoutItems {
  orderItems: CartItem[];
  address: string;
  phone: string;
  userId: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const { orderItems, address, phone, userId, email }: checkoutItems =
      await request.json();

    // console.log(orderItems, address, phone, userId, email);

    // Validate the input
    if (!orderItems || !Array.isArray(orderItems)) {
      return NextResponse.json({ message: "Invalid items", status: 401 });
    }

    const lineItems = orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 500,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cart`,
      metadata: {
        userId,
        address,
        phone,
      },
      customer_email: email,
    });

    console.log("session response id : ", session.id);

    return NextResponse.json({ sessionId: session.id, status: 200 });
  } catch (error) {
    console.error("Error creating Stripe Checkout Session:", error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
