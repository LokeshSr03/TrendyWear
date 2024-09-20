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
} from "./reducers/productReducer";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productAll: productAllReducer,
});

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
