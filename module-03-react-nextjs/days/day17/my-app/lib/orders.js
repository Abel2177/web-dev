import { randomUUID } from "node:crypto";

const store = globalThis;

store.addisEatsOrders ??= [];

export function getOrders() {
  return store.addisEatsOrders;
}

export function createOrder(data) {
  const order = {
    id: randomUUID(),
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  getOrders().push(order);
  return order;
}