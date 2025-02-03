import { NextResponse } from "next/server";
import { dbConnect } from "./lib/db";
import User from "./models/UserSchema";
import jwt from "jsonwebtoken";

// Middleware function
export async function middleware(req) {
  const token = req.cookies.get("authToken"); // Get token from cookies
  const { pathname } = req.nextUrl; // Get current page path
  console.log(pathname);
  console.log(token);

  // If no token and trying to access admin/profile page, redirect to sign-in page
  if (!token && (pathname.startsWith("/admin") || pathname.startsWith("/profile"))) {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to Sign In page
  }

  // If user is logged in, restrict access to Sign In and Sign Up pages
  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage or dashboard
  }

  // If token exists, check if it's valid
  try {
    // Only verify the token if it's set
    if (token) {
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded =============================");
      console.info(decoded);

      // Connect to database and check the user's role
      await dbConnect();
      const user = await User.findById(decoded._id);

      // If user doesn't exist or doesn't have admin role, block access to admin routes
      if (!user || (pathname.startsWith("/admin") && user.role !== "admin")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized access" },
          { status: 403 } // Forbidden
        );
      }
    }

    // Allow access to the route if user is admin or any other authorized user
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 401 } // Unauthorized
    );
  }
}

// Define routes where middleware should run
export const config = {
  matcher: ["/sign-in", "/sign-up", "/profile", "/admin/:path*"], // Apply to Sign In, Sign Up, and Profile pages
};
