import { combineReducers } from "redux";
import authReducer from "./authReducer";
import addUserReducer from "./addUserReducer";
import getAllUsers from "./Users_methods";

export const reducers = combineReducers({
  authReducer,
  addUserReducer,
  getAllUsers,
});
