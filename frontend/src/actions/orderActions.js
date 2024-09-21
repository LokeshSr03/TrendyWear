import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_SINGLE_FAIL,
  ORDER_SINGLE_REQUEST,
  ORDER_SINGLE_SUCCESS,
} from "../constants/orderConstants";

const createOrder =
  (total_amount, status, items) => async (dispatch, getstate) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getstate();

      const config = {
        header: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/orders`,
        {
          total_amount,
          status,
          items,
        },
        config
      );

      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_GET_REQUEST });
    const config = {
      header: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = axios.get("/api/orders", config);

    dispatch({ type: ORDER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getOrderById = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_SINGLE_REQUEST });
    const config = {
      header: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_SINGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { createOrder, getOrderById, getOrders };
