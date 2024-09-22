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
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
} from "../constants/orderConstants";

const createOrder =
  (items, total_amount, status) => async (dispatch, getstate) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getstate();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/orders`,
        {
          items,
          total_amount,
          status,
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

const getOrders = () => async (dispatch, getstate) => {
  try {
    dispatch({ type: ORDER_GET_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/orders", config);

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

const getOrderById = (id) => async (dispatch, getstate) => {
  try {
    dispatch({ type: ORDER_SINGLE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

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
const cancelOrder = (id) => async (dispatch, getstate) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { createOrder, getOrderById, getOrders, cancelOrder };
