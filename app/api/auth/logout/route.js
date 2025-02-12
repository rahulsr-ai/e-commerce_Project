import { cookies } from "next/headers";

export async function POST() {
  try {
    // Await the cookies function before setting a value
    const cookieStore = await cookies();

    cookieStore.set({
      name: "authToken",
      value: "",
      path: "/",
      expires: new Date(0), // Expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json(
      { message: "Logged out successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
