import { useReducer } from "react";

const initialState = {
  count: 0,
  total: 0,
  message: "",
};

function orderReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        count: state.count + 1,
        total: state.total + action.price,
        message: "Dish added",
      };

    case "remove":
      return {
        ...state,
        count: Math.max(0, state.count - 1),
        total: Math.max(0, state.total - action.price),
        message: "Dish removed",
      };

    case "clear":
      return initialState;

    default:
      return state;
  }
}

function OrderStateDemo() {
  const [state, dispatch] = useReducer(
    orderReducer,
    initialState
  );

  return (
    <div>
      <h2>Order Demo</h2>

      <p>Items: {state.count}</p>

      <p>Total: {state.total} ETB</p>

      <p>{state.message}</p>

      <button
        onClick={() =>
          dispatch({
            type: "add",
            price: 100,
          })
        }
      >
        Add
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "remove",
            price: 100,
          })
        }
      >
        Remove
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "clear",
          })
        }
      >
        Clear
      </button>
    </div>
  );
}

export default OrderStateDemo;