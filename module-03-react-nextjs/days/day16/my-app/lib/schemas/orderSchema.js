import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string().trim().min(2, "Name must be at least 2 characters."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{9,15}$/, "Enter a valid phone number."),
  items: z
    .array(
      z.object({
        dishId: z.string().min(1, "Dish ID is required."),
        quantity: z.number().int().min(1, "Quantity must be at least 1."),
      })
    )
    .min(1, "Add at least one dish to your order."),
});