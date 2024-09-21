import {
  CART_ADD_SUCCESS,
  CART_REMOVE_SUCCESS,
} from "../constants/cartConstants";

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.id === item.id);

      if (existItem) {
        // If the item already exists, replace it
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === existItem.id ? item : i
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
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };

    default:
      return state; // Return current state when no action matches
  }
};

export { cartReducer };
