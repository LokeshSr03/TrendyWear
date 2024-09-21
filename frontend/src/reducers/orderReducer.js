import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_GET_REQUEST,
  ORDER_GET_FAIL,
  ORDER_GET_SUCCESS,
  ORDER_SINGLE_FAIL,
  ORDER_SINGLE_REQUEST,
  ORDER_SINGLE_SUCCESS,
} from "../constants/orderConstants";

const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };

    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderGetReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return { loading: true };

    case ORDER_GET_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderSingleReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_SINGLE_REQUEST:
      return { loading: true };

    case ORDER_SINGLE_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_SINGLE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { orderCreateReducer, orderGetReducer, orderSingleReducer };
