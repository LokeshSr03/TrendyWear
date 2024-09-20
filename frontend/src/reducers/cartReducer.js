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
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === existItem.id ? item : i
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }

    case CART_REMOVE_SUCCESS:
      return {
        cartItems: state.cartItems.filter((i) => i.id !== action.payload),
      };
  }
};

export { cartReducer };
