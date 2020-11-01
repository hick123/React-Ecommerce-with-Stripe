import * as types from "./cart.types";
import * as utils from "./cart.utils";

const initialState = {
  cart_items: [],
  totalPrice: 0,
  total: {
    count: 0,
    amount: 0,
  },
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_CART:
      return {
        ...state,
        cart_items: action.payload,
      };

    case types.ADD_TO_CART:
      return {
        ...state,
        cart_items: utils.addToCart(state.cart_items, action.payload),
      };

    case types.INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart_items: utils.increaseProductCount(
          state.cart_items,
          action.payload
        ),
      };

    case types.DECREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart_items: utils.decreaseProductCount(
          state.cart_items,
          action.payload
        ),
      };

    case types.UPDATE_TOTAL:
      return {
        ...state,
        total: utils.updateTotal(state.cart_items, action.payload),
      };

    case types.CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart_items: utils.changeProductCount(
          state.cart_items,
          action.payload.cart_item,
          action.payload.quantity
        ),
      };

    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cart_items: utils.removeProduct(state.cart_items, action.payload),
      };

    case types.CLEAR_CART:
      return {
        ...state,
        cart_items: [],
      };

    default:
      return {
        ...state,
      };
  }
};
