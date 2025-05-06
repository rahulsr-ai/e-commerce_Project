import { NextResponse } from "next/server";


export async function middleware(req) {
  const { cookies } = req;
 
  
  
  
  

  const token = cookies.get("authToken")?.value
  const googletoken = cookies.get("__Secure-authjs.session-token")?.value
  const { pathname } = req.nextUrl; // Get current page path

 

  console.log("here is your token", token, googletoken)
  

  // If no token and trying to access admin/profile page, redirect to sign-in page
  if (
    !token &&
    !googletoken && 
    (pathname.startsWith("/admin") || pathname.startsWith("/Account"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // Redirect to Sign In page
  }

  // If user is logged in, restrict access to Sign In and Sign Up pages
  if (
    (token || googletoken) &&
    (pathname === "/sign-in" || pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage or dashboard
  }

  // Allow access to the route if user is admin or any other authorized user
  return NextResponse.next();
}


// Apply middleware only to specific routes
export const config = {
  matcher: ["/admin/:path*", "/Account/:path*", "/sign-in", "/sign-up", "/" ],
};
