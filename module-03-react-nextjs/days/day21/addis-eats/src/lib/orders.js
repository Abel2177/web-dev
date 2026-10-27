import { findDish } from "@/app/menu/dishes";

// In-memory store for orders across the server lifecycle
const ordersStore = globalThis.__ordersStore ?? (globalThis.__ordersStore = new Map());

// Helper to determine status and step from elapsed time
export function calculateOrderStatus(createdAtISO) {
  const createdTime = new Date(createdAtISO).getTime();
  const elapsedSeconds = Math.max(0, (Date.now() - createdTime) / 1000);

  if (elapsedSeconds < 10) {
    return {
      status: "confirmed",
      step: 1,
      statusTitle: "Order Confirmed",
      description: "Your order has been received and sent to the kitchen.",
      estimatedMinutes: 25,
      progressPercent: 25,
    };
  } else if (elapsedSeconds < 25) {
    return {
      status: "preparing",
      step: 2,
      statusTitle: "Preparing in Kitchen",
      description: "Our chefs in Addis Ababa are freshly preparing your dishes.",
      estimatedMinutes: 18,
      progressPercent: 50,
    };
  } else if (elapsedSeconds < 50) {
    return {
      status: "out_for_delivery",
      step: 3,
      statusTitle: "Out for Delivery",
      description: "Courier Dawit is en route with your meal on a motorbike.",
      estimatedMinutes: 6,
      progressPercent: 75,
    };
  } else {
    return {
      status: "delivered",
      step: 4,
      statusTitle: "Delivered",
      description: "Your order has been delivered! Melkam Mikib (Bon Appétit)!",
      estimatedMinutes: 0,
      progressPercent: 100,
    };
  }
}

// Pre-seed demo orders so testing works out of the box
function initDemoOrders() {
  const demoOrders = [
    {
      id: "ord-demo-42",
      userId: "usr_1",
      customerName: "Almaz",
      address: "Bole Medhanialem, House 402, Addis Ababa",
      phone: "+251 91 123 4567",
      items: [
        { dishId: 1, name: "Classic Margherita Pizza", quantity: 2, price: 300 },
        { dishId: 2, name: "Vegetarian Stir-Fry", quantity: 1, price: 250 },
      ],
      createdAt: new Date(Date.now() - 12000).toISOString(),
    },
    {
      id: "sample-1",
      userId: "usr_2",
      customerName: "Dawit",
      address: "Kazanchis, Near ECA Building, Addis Ababa",
      phone: "+251 92 456 7890",
      items: [
        { dishId: 3, name: "Chocolate Chip Cookies", quantity: 3, price: 120 },
      ],
      createdAt: new Date(Date.now() - 2000).toISOString(),
    },
  ];

  for (const ord of demoOrders) {
    if (!ordersStore.has(ord.id)) {
      ordersStore.set(ord.id, ord);
    }
  }
}

initDemoOrders();

export function saveOrder(orderData) {
  const id = orderData.id || crypto.randomUUID();
  const createdAt = orderData.createdAt || new Date().toISOString();

  // Enrich items with dish name if not present
  const enrichedItems = (orderData.items || []).map((item) => {
    const dish = findDish(item.dishId);
    return {
      dishId: item.dishId,
      quantity: item.quantity,
      name: item.name || dish?.name || `Dish #${item.dishId}`,
      cuisine: dish?.cuisine || "Delicious",
      caloriesPerServing: dish?.caloriesPerServing || 250,
    };
  });

  const order = {
    ...orderData,
    id,
    items: enrichedItems,
    createdAt,
  };

  ordersStore.set(id, order);
  return getOrder(id);
}

export function getOrder(id) {
  if (!id) return null;
  const order = ordersStore.get(id);
  // Never manufacture an order for an unrecognised URL. Doing so would make a
  // guessed identifier look valid and could expose a guest-shaped order record.
  if (!order) return null;

  const liveState = calculateOrderStatus(order.createdAt);

  return {
    ...order,
    status: liveState.status,
    statusStep: liveState.step,
    statusTitle: liveState.statusTitle,
    statusDescription: liveState.description,
    estimatedMinutes: liveState.estimatedMinutes,
    progressPercent: liveState.progressPercent,
    lastPolledAt: new Date().toISOString(),
  };
}

/**
 * Get all orders — used by the staff kitchen dashboard.
 */
export function getAllOrders() {
  return [...ordersStore.keys()].map((id) => getOrder(id));
}

/**
 * Get orders filtered by userId — used to scope the orders page query
 * so a user cannot read another account's orders.
 */
export function getOrdersByUser(userId) {
  return [...ordersStore.entries()]
    .filter(([, order]) => order.userId === userId)
    .map(([id]) => getOrder(id));
}
