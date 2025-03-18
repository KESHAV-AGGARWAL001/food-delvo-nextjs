import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/dbConnect";
import { Food, IFood } from "@/lib/models/Food";

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();
    const foods = (await Food.find({})) as IFood[];
    return NextResponse.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { message: "Error fetching foods", error: (error as Error).message },
      { status: 500 }
    );
  }
}
