import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_KEY);

export async function GET(req) {
  try {

    const sessionId = req.nextUrl.searchParams.get("session_id");
    console.log("sessionId", sessionId);

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Session ID required" }), {
        status: 400,
      });
    }

    // ✅ Fetch the session details
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer_details"], // ✅ Use this instead of shipping_details
    });

    console.log("Stripe Session Data:", session); // ✅ Debugging

    return new Response(
      JSON.stringify({
        shipping_details: session?.customer_details?.address,
        customer_details: session?.customer_details,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
