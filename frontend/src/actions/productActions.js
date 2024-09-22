import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_SINGLE_REQUEST,
  PRODUCT_SINGLE_FAIL,
  PRODUCT_SINGLE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
} from "../constants/productConstants";
import axios from "axios";

const createProduct =
  (name, description, price, stock, image) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data", // Ensure this is set for sending images
        },
      };

      // Create a FormData object and append each field
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post("/api/products", formData, config);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_GET_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({ type: PRODUCT_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SINGLE_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_SINGLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SINGLE_FAIL,
      payload:
        error.respons && error.respons.data.message
          ? error.respons.data.message
          : error.message,
    });
  }
};

const deleteProduct = (id) => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getstate();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.respons && error.respons.data.message
          ? error.respons.data.message
          : error.message,
    });
  }
};
const updateProduct =
  (id, name, description, price, stock) => async (dispatch, getstate) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getstate();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${id}`,
        { name, description, price, stock },
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.respons && error.respons.data.message
            ? error.respons.data.message
            : error.message,
      });
    }
  };
export {
  createProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
