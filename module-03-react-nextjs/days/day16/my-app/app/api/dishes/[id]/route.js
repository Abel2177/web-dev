import { NextResponse } from "next/server";
import { dishes } from "@/data/dishes";

export async function GET(_request, { params }) {
  const { id } = await params;

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return NextResponse.json(
      {
        success: false,
        message: "Dish not found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: dish,
  });
}