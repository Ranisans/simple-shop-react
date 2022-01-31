/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const name = 'cart';
const initialState = {
  products: [],
  productsId: [],
};

const findIndex = (state, productData) =>
  state.products.findIndex((item) => item.productData.id === productData.id);

export const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    addItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state.products[itemIndex].count += 1;
      } else {
        state.products.push({ ...payload, count: 1 });
        state.productsId.push(payload.productData.id);
      }
    },
    removeItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state.products.splice(itemIndex, 1);
        state.productsId.splice(itemIndex, 1);
      }
    },
    increaseItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state.products[itemIndex].count += 0;
      }
    },
    decreaseItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        if (state.products[itemIndex].count <= 1) {
          // remove item
          state.products.splice(itemIndex, 1);
          state.productsId.splice(itemIndex, 1);
        } else {
          state.products[itemIndex].count -= 1;
        }
      }
    },
    updateAttributes(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);

      if (itemIndex >= 0) {
        const { attribute } = payload;
        state.products[itemIndex].attributes[attribute.key] = attribute.value;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  updateAttributes,
} = cartSlice.actions;
export default cartSlice.reducer;
