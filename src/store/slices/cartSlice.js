import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  deliveryFeee: 19,
  freeDeliveryFrom: 500,
  numberOrder: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        (item) => item.product.id === newProduct.id
      );

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },

    changeQuantity: (state, action) => {
      const { productId, amount } = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        cartItem.quantity += amount;
      }

      if (cartItem.quantity <= 0) {
        state.items = state.items.filter((item) => item !== cartItem);
      }
    },

    makeOrder: (state) => {
      state.numberOrder += 1;
      state.items.length = 0;
    },
  },
});

export const { addCartItem, changeQuantity, makeOrder } = cartSlice.actions;

export const selectNumberItems = (state) => state.cart.items.length;

export const selectSubtotal = (state) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

const cartSelector = (state) => state.cart;

export const selectedDeliveryPrice = createSelector(
  cartSelector,
  selectSubtotal,
  (cart, subtotal) => (subtotal > cart.freeDeliveryFrom ? 0 : cart.deliveryFeee)
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectedDeliveryPrice,
  (subtotal, deliveryPrice) => subtotal + deliveryPrice
);
