import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userRegisterReducer,
  userLoginReducer,
  userProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  productAllReducer,
  productCreateReducer,
  productDeleteReducer,
  productSingleReducer,
  productUpdateReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderGetReducer,
  orderSingleReducer,
} from "./reducers/orderReducer";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productAll: productAllReducer,
  productSingle: productSingleReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderGet: orderGetReducer,
  orderSingle: orderSingleReducer,
  orderDelete: orderDeleteReducer,
});

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  userLogin: { userInfo: userFromLocalStorage },
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
