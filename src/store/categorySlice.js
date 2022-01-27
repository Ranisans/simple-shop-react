/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCategoryList } from 'api/category';
import * as status from 'constants/thunkStatus';

const name = 'category';
const initialState = {
  categoryList: [],
  activeCategory: undefined,
  status: status.IDLE,
};

export const loadCategories = createAsyncThunk(
  `${name}/loadCategories`,
  async () => {
    const { categories } = await getCategoryList();

    const result = categories.map((category) => category.name);

    return result;
  }
);

export const categorySlice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = status.LOADING;
        state.categoryList = [];
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoryList = action.payload;
        [state.activeCategory] = action.payload;
        state.status = status.SUCCEEDED;
      })
      .addCase(loadCategories.rejected, (state) => {
        state.status = status.FAILED;
      });
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
