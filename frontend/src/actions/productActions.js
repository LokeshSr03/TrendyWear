import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
} from "../constants/productConstants";
import axios from "axios";

const createProduct =
  (name, description, price, stock, image) => async (dispatch, getstate) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getstate();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/products",
        { name, description, price, stock, image },
        config
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.mesaage
            ? error.response.data.mesaage
            : error.mesaage,
      });
    }
  };

export { createProduct };
