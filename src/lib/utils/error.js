import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function handleError(error) {
  console.error(error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  if (error.code === 11000) {
    return NextResponse.json(
      { message: "Duplicate entry found" },
      { status: 400 }
    );
  }

  // Validation error
  if (error.name === "ValidationError") {
    return NextResponse.json(
      {
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      },
      { status: 400 }
    );
  }

  // JWT error
  if (error.name === "JsonWebTokenError") {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Default error
  return NextResponse.json(
    { message: "Internal server error", error: error.message },
    { status: 500 }
  );
}
