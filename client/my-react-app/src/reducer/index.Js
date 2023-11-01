import { combineReducers } from "redux";
import authReducer from "./authReducer";
import addUserReducer from "./add_User_Reducer";

export const reducers = combineReducers({ authReducer, addUserReducer });
