/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getProductById } from '../api/product';
import * as status from '../constants/thunkStatus';

const name = 'activeProducts';
const initialState = {
  productData: undefined,
  status: status.IDLE,
  attributes: {},
  activeImageIndex: 0,
};

export const loadProductData = createAsyncThunk(
  `${name}/loadProductData`,
  async (productId) => {
    const { product } = await getProductById(productId);

    return product;
  }
);

export const activeProductSlice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveImageIndex(state, action) {
      state.activeImageIndex = action.payload;
    },
    setAttribute(state, action) {
      const { key, value } = action.payload;
      state.attributes[key] = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.productData = undefined;
        state.attributes = {};
        state.activeImageIndex = 0;
        state.status = status.LOADING;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.status = status.SUCCEEDED;
      })
      .addCase(loadProductData.rejected, (state) => {
        state.status = status.FAILED;
      });
  },
});

export const { setActiveImageIndex, setAttribute } = activeProductSlice.actions;
export default activeProductSlice.reducer;
