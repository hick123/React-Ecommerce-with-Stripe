import * as types from "./cart.types";

export const addProductAction = (product) => ({
  type: types.ADD_TO_CART,
  payload: product,
});

export const loadCartAction = (cart_items) => ({
  type: types.LOAD_CART,
  payload: cart_items,
});

export const removeProductAction = (product) => ({
  type: types.REMOVE_FROM_CART,
  payload: product,
});

export const changeProductCount = (product) => ({
  type: types.CHANGE_PRODUCT_QUANTITY,
  payload: product,
});

export const increaseProductCountAction = (quantity) => ({
  type: types.INCREASE_PRODUCT_QUANTITY,
  payload: quantity,
});

export const decreaseProductCountAction = (quantity) => ({
  type: types.DECREASE_PRODUCT_QUANTITY,
  payload: quantity,
});

export const updateTotalAction = (quantity) => ({
  type: types.UPDATE_TOTAL,
});

export const clearCartAction = () => ({
  type: types.CLEAR_CART,
});
