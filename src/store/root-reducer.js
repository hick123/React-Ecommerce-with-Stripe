import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { filterReducer } from "./filter/filter.reducer";
const reducers = combineReducers({
  cartState: cartReducer,
  filterState: filterReducer,
});

export default reducers;
