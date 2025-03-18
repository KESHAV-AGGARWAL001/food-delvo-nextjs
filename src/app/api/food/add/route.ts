import { NextResponse } from "next/server";
import { Food, IFood } from "@/lib/models/Food";
import { uploadFile } from "@/lib/utils/fileUpload";
import connectMongo from "@/lib/db";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectMongo();

    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    // Upload file using the utility function
    const { publicUrl } = await uploadFile(file);

    // Create food item
    const food = (await Food.create({
      name: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      image: publicUrl,
      countInStock: Number(formData.get("countInStock")) || 0,
    })) as IFood;

    return NextResponse.json(food, { status: 201 });
  } catch (error) {
    console.error("Error adding food:", error);
    return NextResponse.json(
      { message: "Error adding food", error: (error as Error).message },
      { status: 500 }
    );
  }
}
