//@ts-nocheck

import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import Wishlist from '../../../models/WishlistSchema'; // Your Wishlist model

export async function GET(request, { params }) {
  const { userId } = params; // Get userId from the URL

  try {
    await dbConnect(); // Connect to the database

    // Find the wishlist for the user
    const wishlist = await Wishlist.find({ userId });

    // Return the wishlist as JSON
    return NextResponse.json(wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    // If there's an error, return a message and status code
    return NextResponse.json({ message: 'Error fetching wishlist' }, { status: 500 });
  }
}
