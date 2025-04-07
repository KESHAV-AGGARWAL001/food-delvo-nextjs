import { NextResponse } from "next/server";
import connectMongo from "../../../../lib/db";
import { authenticate } from "../../../../lib/middleware/auth";
import { cookies } from "next/headers";

interface CartItem {
  foodId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Authenticate user
    const authResponse: any = await authenticate(request);
    if (authResponse?.status === 401) {
      return authResponse;
    }

    await connectMongo();

    // Get cart data from cookies
    const cookieStore = await cookies();
    const cartData = cookieStore.get("cart")?.value || "[]";
    const cart = JSON.parse(cartData) as CartItem[];
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { message: "Error fetching cart", error: (error as Error).message },
      { status: 500 }
    );
  }
}
