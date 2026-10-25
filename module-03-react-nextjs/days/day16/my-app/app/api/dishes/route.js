import { NextResponse } from "next/server";
import { dishes } from "@/data/dishes";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").trim().toLowerCase();
  const requestedPage = Number(searchParams.get("page") || 1);

  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    return NextResponse.json(
      { success: false, message: "Page must be a positive integer." },
      { status: 400 }
    );
  }

  const filtered = dishes.filter((dish) =>
    `${dish.name} ${dish.description}`.toLowerCase().includes(search)
  );

  const pageSize = 2;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const data = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      pageSize,
      totalItems: filtered.length,
      totalPages,
    },
  });
}