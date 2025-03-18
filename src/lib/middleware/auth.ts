import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export interface JWTPayload {
  userId: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JWTPayload;
}

export type AuthResponse = NextResponse | { user: JWTPayload };

export async function authenticate(request: Request): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated", status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    Object.defineProperty(request, "user", {
      value: decoded,
      writable: true,
      configurable: true,
    });

    return { user: decoded, status: 200 };
  } catch (error) {
    return NextResponse.json({
      message: "Authentication failed",
      status: 401,
      error: (error as Error).message,
    });
  }
}

export async function isAdmin(request: Request): Promise<NextResponse | void> {
  const authenticatedReq = request as AuthenticatedRequest;
  try {
    if (!authenticatedReq.user || authenticatedReq.user.role !== "admin") {
      return NextResponse.json({
        message: "Admin access required",
        status: 403,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Authorization failed",
      status: 403,
      error: (error as Error).message,
    });
  }
}
