import connectMongo from "@/lib/db";
import { authenticate } from "@/lib/middleware/auth";
import { IOrder, Order } from "@/lib/models/Order";
import { NextResponse } from "next/server";

interface UserResponse {
  user: {
    userId: string;
    role: string;
    iat: number;
    exp: number;
  };
  status: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectMongo();
    const { orderItems, address, phone, user, isDelivered, email }: IOrder =
      await request.json();

    // console.log(
    //   "place order data :",
    //   orderItems,
    //   address,
    //   phone,
    //   user,
    //   isDelivered,
    //   email
    // );

    const newOrder = await Order.create({
      orderItems,
      address,
      phone,
      user,
      isDelivered,
      email,
    });

    await newOrder.save();

    return NextResponse.json({
      message: "New order is created ",
      data: newOrder,
      status: 200,
    });
  } catch (error) {
    console.log("Error in adding new order to the database", error);
    return NextResponse.json({
      message: "Error adding new orders",
      error: (error as Error).message,
      status: 500,
    });
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    await connectMongo();

    const authResponse = (await authenticate(request)) as UserResponse;

    const userId = authResponse.user.userId!;

    const orders = (await Order.find({ user: userId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })) as IOrder[];

    return NextResponse.json(orders);
    // return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders", error: (error as Error).message },
      { status: 500 }
    );
  }
}
