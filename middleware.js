import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value; // Token leke check kar
  const { pathname } = req.nextUrl;

  console.log("token =============================");
  console.log(token);
  

  // Sign-in & Sign-up wale pages pe logged-in user ko redirect karna hai
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url)); // Home ya dashboard pe bhejo
  }

  // Agar token nahi hai aur restricted pages pe ja raha hai toh redirect karo
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Token decode kar lo, but verify mat karo
  // let decoded;
  // try {
  //   decoded = jwt.decode(token);
  // } catch (error) {
  //   console.error("JWT Decode Failed:", error);
  // }

  // console.log("decoded =============================");
  // console.log(decoded);
  

  // // Agar user admin page pe ja raha hai aur role admin nahi hai, toh access block karo
  // if (decoded && pathname.startsWith("/admin") && decoded.role !== "admin") {
  //   return NextResponse.json(
  //     { success: false, message: "Unauthorized access" },
  //     { status: 403 }
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/profile", "/admin/:path*"],
};
