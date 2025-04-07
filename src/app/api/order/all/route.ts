import { NextResponse } from "next/server";
import {
  authenticate,
  AuthenticatedRequest,
} from "../../../../lib/middleware/auth";
import { isAdmin } from "../../../../lib/middleware/auth";
import { Order, IOrder } from "../../../../lib/models/Order";
import connectMongo from "../../../../lib/db";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const authResponse = await authenticate(request);
    if (authResponse instanceof NextResponse) {
      return authResponse;
    }

    const adminResponse = await isAdmin(request as AuthenticatedRequest);
    if (adminResponse instanceof NextResponse) {
      return adminResponse;
    }

    await connectMongo();

    const orders = (await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })) as IOrder[];

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: (error as Error).message },
      { status: 500 }
    );
  }
}
