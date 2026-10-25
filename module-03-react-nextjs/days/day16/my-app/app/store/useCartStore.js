import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === dish.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...dish, quantity: 1 }],
          };
        }),

      removeItem: (dishId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== dishId),
        })),

      updateQuantity: (dishId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== dishId)
              : state.items.map((item) =>
                  item.id === dishId ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "addis-eats-order",
    }
  )
);