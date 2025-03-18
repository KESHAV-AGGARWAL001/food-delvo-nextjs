import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { IUser, User } from "./models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface CustomJWTPayload extends JwtPayload {
  userId: string;
}

export async function verifyAuth(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    const payload = jwt.verify(token, JWT_SECRET);
    const decoded = payload as unknown as CustomJWTPayload;

    const user: IUser = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return null;
    }

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}
