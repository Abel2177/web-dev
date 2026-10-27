const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

// A small dependency-free schema with the same safeParse contract as Zod.
// It can be reused by both a server action and the HTTP route.
export const orderSchema = {
  safeParse(input) {
    const fieldErrors = {};

    if (!input || typeof input !== "object") {
      return { success: false, error: { flatten: () => ({ fieldErrors: { form: ["Order data is required."] } }) } };
    }

    if (!isNonEmptyString(input.customerName)) fieldErrors.customerName = ["Enter your name."];
    if (!isNonEmptyString(input.address)) fieldErrors.address = ["Enter a delivery address."];
    if (!isNonEmptyString(input.phone)) fieldErrors.phone = ["Enter a phone number."];

    const items = Array.isArray(input.items) ? input.items : [];
    if (!items.length) {
      fieldErrors.items = ["Choose at least one dish."];
    } else if (items.some((item) => !item || !Number.isInteger(Number(item.dishId)) || Number(item.quantity) < 1)) {
      fieldErrors.items = ["Each item needs a valid dish and quantity."];
    }

    if (Object.keys(fieldErrors).length) {
      return { success: false, error: { flatten: () => ({ fieldErrors }) } };
    }

    return { success: true, data: {
      customerName: input.customerName.trim(),
      address: input.address.trim(),
      phone: input.phone.trim(),
      items: items.map((item) => ({ dishId: Number(item.dishId), quantity: Number(item.quantity) })),
    } };
  },
};
