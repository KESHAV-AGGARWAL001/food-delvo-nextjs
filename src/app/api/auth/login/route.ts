import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import connectMongo from "../../../../lib/db";
import { IUser, User } from "../../../../lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error(
    "Please define the JWT_SECRET environment variable inside .env"
  );
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    let { email, password }: LoginRequest = await request.json();

    console.log("login route :) ", email, password);

    // Find user and include password field
    await connectMongo();
    const user: IUser | null = await User?.findOne({ email }).select(
      "+password"
    );

    console.log("user login route :) ", user);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password doesn't match. Wrong Credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Error logging in", error: (error as Error).message },
      { status: 500 }
    );
  }
}
