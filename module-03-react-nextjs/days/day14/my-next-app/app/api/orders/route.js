import { NextResponse } from "next/server";
import { orderSchema } from "@/lib/schemas/orderSchema";
import { dishes } from "@/data/dishes";

// Temporary in-memory storage for development.
const orders = globalThis.orders ?? [];
globalThis.orders = orders;

export async function POST(request) {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      return NextResponse.json(
        {
          success: false,
          message: "Please correct the order details.",
          fieldErrors,
        },
        { status: 422 }
      );
    }

    // Verify every dish exists.
    for (const item of result.data.items) {
      const dishExists = dishes.some((dish) => dish.id === item.dishId);

      if (!dishExists) {
        return NextResponse.json(
          {
            success: false,
            message: `Dish ${item.dishId} was not found.`,
            fieldErrors: {
              items: [`Dish ${item.dishId} does not exist.`],
            },
          },
          { status: 422 }
        );
      }
    }

    const orderItems = result.data.items.map((item) => {
      const dish = dishes.find((entry) => entry.id === item.dishId);

      return {
        dishId: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: item.quantity,
      };
    });

    const order = {
      id: crypto.randomUUID(),
      ...result.data,
      items: orderItems,
      total: orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON request body.",
      },
      { status: 400 }
    );
  }
}