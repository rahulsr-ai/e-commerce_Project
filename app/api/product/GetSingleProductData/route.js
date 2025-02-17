import { NextResponse } from "next/server";



function GET(req) {

    
  return NextResponse.json({ message: "Hello", success: true });


}
