import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_SINGLE_REQUEST,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_SINGLE_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
} from "../constants/productConstants";

const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: false };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productAllReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { loading: true };
    case PRODUCT_GET_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_GET_FAIL:
      return { loading: true, error: action.payload };

    default:
      return state;
  }
};

const productSingleReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_SINGLE_REQUEST:
      return { loading: true };
    case PRODUCT_SINGLE_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_SINGLE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export {
  productCreateReducer,
  productAllReducer,
  productSingleReducer,
  productDeleteReducer,
  productUpdateReducer,
};
