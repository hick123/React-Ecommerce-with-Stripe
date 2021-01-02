import * as types from "./cart.types";
// import * as utils from "./cart.utils";

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
    case types.ADD_TO_CART:
      return {
        ...state,
        cart_items: action.payload,
      };

    case types.INCREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart_items: action.payload,
      };

    case types.DECREASE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart_items: action.payload,
      };

    case types.UPDATE_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    case types.REMOVE_FROM_CART:
      return {
        ...state,
        cart_items: action.payload,
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
