import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userRegisterReducer,
  userLoginReducer,
  userProfileReducer,
} from "./reducers/userReducer";

const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
});

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userRegister: userFromLocalStorage,
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
