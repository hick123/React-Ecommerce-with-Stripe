// export const addToCart = (cart_items, productToAdd) => {
//   const productAlreadyInCart = cart_items.find(
//     (cartItem) => productToAdd.id === cartItem.id
//   );

//   if (productAlreadyInCart) {
//     return cart_items.map((currentItem, index) =>
//       currentItem.id === productToAdd.id
//         ? { ...currentItem, quantity: currentItem.quantity + 1 }
//         : currentItem
//     );
//   }

//   return [...cart_items, { ...productToAdd, quantity: 1 }];
// };

// export const removeProduct = (cart_items, productToRemove) => {
//   const index = cart_items.find(
//     (cartItem) => cartItem.id === productToRemove.id
//   );

//   if (index) {
//     return cart_items.filter((cartItem) => cartItem.id !== productToRemove.id);
//   }

//   return cart_items;
// };

// export const increaseProductCount = (cart_items, product) => {
//   return cart_items.map((currentItem, index) =>
//     currentItem.id === product.id
//       ? { ...currentItem, quantity: currentItem.quantity + 1 }
//       : currentItem
//   );
// };

// export const decreaseProductCount = (cart_items, product) => {
//   const cart_item = cart_items.find((cartItem) => cartItem.id === product.id);
//   if (cart_item.quantity === 1) {
//     return cart_items.filter((cartItem) => cartItem.id !== product.id);
//   }

//   return cart_items.map((currentItem, index) =>
//     currentItem.id === product.id
//       ? { ...currentItem, quantity: currentItem.quantity - 1 }
//       : currentItem
//   );
// };

// export const changeProductCount = (cart_items, product, setQuantity) => {
//   console.log("product, setQuantity", product, setQuantity);
//   // const cart_item = cart_items.find((cartItem) => cartItem.id === product.id);
//   if (setQuantity === 0) {
//     return cart_items.filter((cartItem) => cartItem.id !== product.id);
//   }

//   return cart_items.map((currentItem, index) =>
//     currentItem.id === product.id
//       ? { ...currentItem, quantity: setQuantity }
//       : currentItem
//   );
// };

// export const updateTotal = (cart_items) => {
//   let count = cart_items.reduce((sum, product) => {
//     sum += product.quantity;
//     return sum;
//   }, 0);

//   let amount = cart_items.reduce((sum, product) => {
//     sum += product.price * product.quantity;
//     return sum;
//   }, 0);

//   return { count: count, amount: amount };
// };
