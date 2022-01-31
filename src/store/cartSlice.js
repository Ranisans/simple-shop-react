/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const name = 'cart';
const initialState = [];

const findIndex = (state, productData) =>
  state.findIndex((item) => item.productData.id === productData.id);

export const cartSlice = createSlice({
  name,
  initialState,
  reducers: {
    addItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state[itemIndex].count += 1;
      } else {
        state.push({ ...payload, count: 1 });
      }
    },
    removeItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      }
    },
    increaseItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        state[itemIndex].count += 0;
      }
    },
    decreaseItem(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);
      if (itemIndex >= 0) {
        if (state[itemIndex].count <= 1) {
          // remove item
          state.splice(itemIndex, 1);
        } else {
          state[itemIndex].count -= 1;
        }
      }
    },
    updateAttributes(state, action) {
      const { payload } = action;
      const itemIndex = findIndex(state, payload.productData);

      if (itemIndex >= 0) {
        const { attribute } = payload;
        state[itemIndex].attributes[attribute.key] = attribute.value;
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
