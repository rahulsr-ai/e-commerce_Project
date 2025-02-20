import { NextResponse } from "next/server";

export function GET(req) {
  const url = new URL(req.url); // Create a URL object
  const searchParams = url.searchParams; // Get query parameters
  const name = searchParams.get("name"); // Extract "name"

  console.log("Product Name:", name);

  return NextResponse.json({ message: `Received product: ${name}`, success: true });
}
