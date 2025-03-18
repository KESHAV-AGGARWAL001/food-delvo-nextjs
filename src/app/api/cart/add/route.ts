import { NextResponse } from "next/server";
import { authenticate, AuthResponse } from "@/lib/middleware/auth";
import { Food, IFood } from "@/lib/models/Food";
import { cookies } from "next/headers";
import connectMongo from "@/lib/db";

interface CartItem {
  foodId: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface AddToCartRequest {
  foodId: string;
  quantity: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Authenticate user
    const authResponse = await authenticate(request);
    if (authResponse) {
      return authResponse as NextResponse;
    }

    await connectMongo();

    const { foodId, quantity }: AddToCartRequest = await request.json();

    // Validate food exists
    const food = (await Food.findById(foodId)) as IFood | null;
    if (!food) {
      return NextResponse.json({ message: "Food not found" }, { status: 404 });
    }

    // Get existing cart
    const cookieStore = await cookies();
    const existingCart = JSON.parse(
      cookieStore.get("cart")?.value || "[]"
    ) as CartItem[];

    // Add or update item in cart
    const existingItemIndex = existingCart.findIndex(
      (item) => item.foodId === foodId
    );
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        foodId,
        quantity,
        name: food.name,
        price: food.price,
        image: food.image,
      });
    }

    // Create response
    const response = NextResponse.json(existingCart);

    // Set updated cart in cookie
    cookieStore.set("cart", JSON.stringify(existingCart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { message: "Error adding to cart", error: (error as Error).message },
      { status: 500 }
    );
  }
}
