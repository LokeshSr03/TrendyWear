import {
  CART_ADD_FAIL,
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_FAIL,
  CART_REMOVE_REQUEST,
  CART_REMOVE_SUCCESS,
} from "../constants/cartConstants";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const addCart = (id, quantity) => async (dispatch, getstate) => {
  try {
    dispatch({ type: CART_ADD_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/products/${id}`);

    dispatch({ type: CART_ADD_SUCCESS, payload: { ...data, quantity } });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getstate().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const removeCart = (id) => async (dispatch, getstate) => {
  try {
    dispatch({ type: CART_REMOVE_REQUEST });

    dispatch({ type: CART_REMOVE_SUCCESS, payload: id });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getstate().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { addCart, removeCart };
