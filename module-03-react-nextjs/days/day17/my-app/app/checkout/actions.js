"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import { dishes } from "@/data/dishes";
import { orderSchema } from "@/lib/schemas/orderSchema";
import { getSession } from "@/lib/auth/session";

export async function placeOrder(_previousState, formData) {
  const customerName = formData.get("customerName");
  const phone = formData.get("phone");
  const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Please sign in to place an order.",
        fieldErrors: {},
      };
    }
  let items;

  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch {
    return {
      success: false,
      message: "Invalid order items.",
      fieldErrors: {},
    };
  }

  const result = orderSchema.safeParse({
    customerName,
    phone,
    items: Array.isArray(items)
      ? items.map((item) => ({
          dishId: String(item.dishId ?? ""),
          quantity: Number(item.quantity),
        }))
      : items,
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const orderItems = [];

  for (const item of result.data.items) {
    const dish = dishes.find((entry) => entry.id === item.dishId);

    if (!dish) {
      return {
        success: false,
        message: "One or more selected dishes are unavailable.",
        fieldErrors: {
          items: ["Please return to the menu and select valid dishes."],
        },
      };
    }

    orderItems.push({
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: item.quantity,
    });
  }

  const order = {
    id: randomUUID(),
    customerName: result.data.customerName,
    phone: result.data.phone,
    items: orderItems,
    total: orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  // Temporary in-memory storage for this exercise.
  globalThis.orders ??= [];
  globalThis.orders.push(order);

  revalidatePath("/cart");
  revalidatePath("/checkout");

  return {
    success: true,
    message: "Your order has been placed successfully!",
    orderId: order.id,
    total: order.total,
    fieldErrors: {},
  };
}