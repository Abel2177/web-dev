export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        items: [...state.items, action.dish],
      };

    case "remove":
      return {
        items: state.items.filter(
          (dish) => dish.id !== action.id
        ),
      };

    case "clear":
      return {
        items: [],
      };

    default:
      throw new Error(
        "Unknown action: " + action.type
      );
  }
}

const initialState = { items: [] };

const dish = {
  id: 1,
  name: "Doro Wot",
  price: 400,
};

console.log(
  cartReducer(initialState, {
    type: "add",
    dish,
  })
);

console.log(
  cartReducer(
    { items: [dish] },
    { type: "remove", id: 1 }
  )
);

console.log(
  cartReducer(
    { items: [dish] },
    { type: "clear" }
  )
);