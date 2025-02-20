import { dbConnect } from "@/lib/db";
import ProductSchema from "@/models/ProductSchema";
import { NextResponse } from "next/server";
import supabase from "@/lib/SupaBaseClient";
import { Subcategory } from "@/models/CategorySchema";





export async function GET(req) {
  let token = req.cookies.get("authToken")?.value;
  console.log("Raw token:", token);

  return NextResponse.json({ message: "Hello", token }, { status: 200 });
}









