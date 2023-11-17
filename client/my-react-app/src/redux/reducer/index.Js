import { combineReducers } from "redux";
import authReducer from "./authReducer";
import addUserReducer from "./addUserReducer";
import getAllUsers from "./Users_methods";
import UpdateUserReducer from "./UpdateUserReducer";
import searchReducer from "./searchReducer";

export const reducers = combineReducers({
  authReducer,
  addUserReducer,
  getAllUsers,
  UpdateUserReducer,
  searchReducer,
});
