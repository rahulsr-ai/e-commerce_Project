// app/api/orders/[userId]/route.js
//@ts-nocheck

import { NextResponse } from 'next/server';
import { dbConnect } from '../../../lib/db';
import Order from '../../../models/OrderSchema'; // Your Order model

export async function GET(request, { params }) {
  const { userId } = params;

  try {
    await dbConnect();
    const orders = await Order.find({ userId });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}


