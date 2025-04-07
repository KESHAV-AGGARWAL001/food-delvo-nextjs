import { NextResponse } from "next/server";
import {
  authenticate,
  AuthenticatedRequest,
} from "../../../../lib/middleware/auth";
import { Order, IOrder } from "../../../../lib/models/Order";
import { cookies } from "next/headers";
import connectMongo from "../../../../lib/db";

interface OrderRequest {
  orderItems: Array<{
    foodId: string;
    quantity: number;
    name: string;
    price: number;
    image: string;
  }>;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Authenticate user
    const authResponse = await authenticate(request);
    if (authResponse instanceof NextResponse) {
      return authResponse;
    }

    await connectMongo();

    const orderData: OrderRequest = await request.json();
    const authenticatedReq = request as AuthenticatedRequest;
    const userId = authenticatedReq.user.userId;

    // Create order
    const order = (await Order.create({
      user: userId,
      orderItems: orderData.orderItems.map((item) => ({
        ...item,
        food: item.foodId,
      })),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      itemsPrice: orderData.itemsPrice,
      taxPrice: orderData.taxPrice,
      shippingPrice: orderData.shippingPrice,
      totalPrice: orderData.totalPrice,
    })) as IOrder;

    // Clear cart after order placement
    const response = NextResponse.json(order, { status: 201 });
    const cookieStore = await cookies();
    cookieStore.set("cart", "[]", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { message: "Error placing order", error: (error as Error).message },
      { status: 500 }
    );
  }
}
