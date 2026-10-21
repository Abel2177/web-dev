import { NextResponse } from "next/server";
import { dishes } from "@/app/data/dishes";

export async function GET() {
  return NextResponse.json(dishes);
}