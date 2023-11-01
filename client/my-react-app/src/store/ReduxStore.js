import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { reducers } from "../reducer/index.Js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistedState = loadFromLocalStorage();
const store = createStore(
  reducers,
  // persistedState,
  composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => store.getState());
export default store;
