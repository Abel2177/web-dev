import { NextResponse } from "next/server";
import { dishes } from "@/data/dishes";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: dishes,
  });
}