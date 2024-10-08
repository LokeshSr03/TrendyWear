import {
  CART_ADD_SUCCESS,
  CART_REMOVE_SUCCESS,
  CART_RESET,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);

      if (existItem) {
        // If the item already exists, replace it
        return {
          cartItems: state.cartItems.map((i) =>
            i._id === existItem._id ? item : i
          ),
        };
      } else {
        // If the item is new, add it to the cart
        return {
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_SUCCESS:
      return {
        cartItems: state.cartItems.filter((i) => i._id !== action.payload),
      };

    case CART_RESET:
      return { cartItems: [] };
    default:
      return state; // Return current state when no action matches
  }
};

export { cartReducer };
