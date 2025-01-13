import { dbConnect } from "@/lib/db";
import  connectToDatabase  from "@/lib/MongoConnection";
import { NextResponse } from "next/server";

// GET route
export async function GET(req) {
  await connectToDatabase();
  // const client = await clientPromise;
  // const db = client.db("nextjs-mongodb-demo");
  // Handle GET request
  return NextResponse.json({ message: "Hello from Next.js!" }, { status: 200 });
}

// POST route
export async function POST(req) {
  await connectToDatabase();
  // const client = await clientPromise;
  // const db = client.db()
  // Handle POST request

  return NextResponse.json({ message: "User data received" }, { status: 200 });
}
