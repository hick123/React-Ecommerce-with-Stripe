import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./root-reducer";
const initialState = {};
// Be sure to ONLY add this middleware in development!
const middleware =
  process.env.NODE_ENV !== "production"
    ? [require("redux-immutable-state-invariant").default(), thunk]
    : [thunk];
const store = createStore(
  reducers,
  initialState,
  // composeWithDevTools(applyMiddleware(thunk))
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
