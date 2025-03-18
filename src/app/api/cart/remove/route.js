import { NextResponse } from "next/server";
import { authenticate } from "@/lib/middleware/auth";

export async function POST(request) {
    try {
        // Authenticate user
        const authResponse = await authenticate(request);
        if (authResponse.status === 401) {
            return authResponse;
        }

        const { foodId } = await request.json();

        // Get existing cart
        const existingCart = JSON.parse(await request.cookies.get("cart")?.value || "[]");

        // Remove item from cart
        const updatedCart = existingCart.filter(item => item.foodId !== foodId);

        // Create response
        const response = NextResponse.json(updatedCart);

        // Set updated cart in cookie
        response.cookies.set("cart", JSON.stringify(updatedCart), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: "Error removing from cart", error: error.message },
            { status: 500 }
        );
    }
}