import { NextResponse } from "next/server";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";

export async function POST(req) {
  try {
    // success_url: "http://localhost:3000/payement/success",

    const key = process.env.NEXT_STRIPE_KEY;
    const { products } = await req.json();
    const token = req.cookies.get("authToken")?.value;
    const googleUser  = await auth();

    if (!products || (!token && !googleUser ) ) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 400 }
      );

    }


    await dbConnect();

    let user;
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decode?.id);
    } else {
      user = await User.findOne({ email: googleUser.user?.email });
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    const email = user.email;

    const stripe = new Stripe(process.env.NEXT_STRIPE_KEY);

    const lineitems = products.map((product) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product?.name,
            images: [product?.images[0]],
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
      success_url:
        "https://quickcart-lake.vercel.app/payment/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://quickcart-lake.vercel.app/payement/cancel",

      // ✅ Full Address Enable (Not Just Country)
      shipping_address_collection: {
        allowed_countries: ["IN", "US", "CA", "GB"], // Jitni countries allow karni ho
      },

      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Free Shipping",
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "inr" },
          },
        },
      ],
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
