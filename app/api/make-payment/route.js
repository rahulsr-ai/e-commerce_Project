import { NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";

export async function POST(req) {
  try {
    const key = process.env.NEXT_STRIPE_KEY;
    const { products } = await req.json();
    const token = req.cookies.get("authToken")?.value;

    if (!products || !token) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 }
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);


    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const email = user.email;


    const stripe = new Stripe(process.env.NEXT_STRIPE_KEY);

    const lineitems = products.map((product) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product?.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
   
      customer_email: email, // ✅ Fix 2: Capture Customer Email
      line_items: lineitems,
      mode: "payment",
      success_url: "http://localhost:3000/payement/success",
      cancel_url: "http://localhost:3000/payement/cancel",
    });

   
     


    return NextResponse.json(
      { message: "payment got it ", success: true, id: session?.id },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "payment got it ", success: true },
      { status: 200 }
    );
  }
}
