import * as types from "./cart.types";
import store from "../../store";

//getting cart items from state

export const addProductAction = (product) => (dispatch) => {
  const cart_items = store.getState().cartState.cart_items;

  const productAlreadyInCart = cart_items.find(
    (cartItem) => product.id === cartItem.id
  );

  if (productAlreadyInCart) {
    const updatedCartItems = cart_items.map((currentItem, index) =>
      currentItem.id === product.id
        ? { ...currentItem, quantity: currentItem.quantity + 1 }
        : currentItem
    );

    dispatch({ type: types.ADD_TO_CART, payload: updatedCartItems });
  } else {
    const cart_items_added = [...cart_items, { ...product, quantity: 1 }];

    dispatch({ type: types.ADD_TO_CART, payload: cart_items_added });
  }
};

export const removeProductAction = (product) => (dispatch) => {
  const cart_items = store.getState().cartState.cart_items;

  const index = cart_items.find((cartItem) => cartItem.id === product.id);
  if (index) {
    const cart_items_removed = cart_items.filter(
      (cartItem) => cartItem.id !== product.id
    );
    dispatch({
      type: types.REMOVE_FROM_CART,
      payload: cart_items_removed,
    });
  }
};

export const increaseProductCountAction = (product) => (dispatch) => {
  const cart_items = store.getState().cartState.cart_items;

  const cart_items_increased = cart_items.map((currentItem, index) =>
    currentItem.id === product.id
      ? { ...currentItem, quantity: currentItem.quantity + 1 }
      : currentItem
  );
  dispatch({
    type: types.INCREASE_PRODUCT_QUANTITY,
    payload: cart_items_increased,
  });
};

export const decreaseProductCountAction = (product) => (dispatch) => {
  const cart_items = store.getState().cartState.cart_items;

  const cart_item = cart_items.find((cartItem) => cartItem.id === product.id);
  if (cart_item.quantity === 1) {
    const cart_items_item_removed = cart_items.filter(
      (cartItem) => cartItem.id !== product.id
    );
    dispatch({
      type: types.DECREASE_PRODUCT_QUANTITY,
      payload: cart_items_item_removed,
    });
  } else {
    const cart_items_item_decreased = cart_items.map((currentItem, index) =>
      currentItem.id === product.id
        ? { ...currentItem, quantity: currentItem.quantity - 1 }
        : currentItem
    );
    dispatch({
      type: types.DECREASE_PRODUCT_QUANTITY,
      payload: cart_items_item_decreased,
    });
  }
};

export const updateTotalAction = () => (dispatch) => {
  const cart_items = store.getState().cartState.cart_items;

  let count = cart_items.reduce((sum, product) => {
    sum += product.quantity;
    return sum;
  }, 0);
  let amount = cart_items.reduce((sum, product) => {
    sum += product.price * product.quantity;
    return sum;
  }, 0);
  const total = { count: count, amount: amount };
  dispatch({
    type: types.UPDATE_TOTAL,
    payload: total,
  });
};

export const clearCartAction = () => ({
  type: types.CLEAR_CART,
});
