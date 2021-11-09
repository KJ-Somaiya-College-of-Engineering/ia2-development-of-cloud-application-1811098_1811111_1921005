import { EMPTY_CART } from "../actions/CartActions";

const initialState = { loading: false, items: [], hydrated: false };

const updateItem = (items, bookId, qty) => {
  const item = items.find((item) => item.bookId === bookId);
  if (item) {
    item.qty = qty;
  }

  return [...items];
};

const removeItem = (bookId, items) => {
  return items.filter((item) => item.bookId !== bookId);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return action.payload.type === "cart"
        ? { ...state, loading: true }
        : state;
    case "FINISH_LOADING":
      return action.payload.type === "cart"
        ? { ...state, loading: false }
        : state;
    case "SYNC_CART":
      return { loading: false, items: [...action.payload] };
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
        hydrated: true,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: updateItem(
          state.items,
          action.payload.bookId,
          action.payload.quantity
        ),
      };
    case "REMOVE_FROM_CART":
      return { ...state, items: [...removeItem(action.payload, state.items)] };
    case EMPTY_CART:
      return { ...state, items: [] };
    default:
      return state;
  }
};
export default cartReducer;
