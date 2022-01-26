/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllCurrencies } from '../api/currency';
import * as status from '../constants/thunkStatus';

const name = 'currency';
const initialState = {
  currencyList: [],
  activeCurrency: undefined,
  status: status.IDLE,
};

export const loadCurrencies = createAsyncThunk(
  `${name}/loadCurrencies`,
  async () => {
    const { currencies } = await getAllCurrencies();
    return currencies;
  }
);

export const currencySlice = createSlice({
  name,
  initialState,
  reducers: {
    setActiveCurrency(state, action) {
      state.activeCurrency = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadCurrencies.pending, (state) => {
        state.currencyList = [];
        state.status = status.LOADING;
      })
      .addCase(loadCurrencies.fulfilled, (state, action) => {
        state.currencyList = action.payload;
        [state.activeCurrency] = action.payload;
        state.status = status.SUCCEEDED;
      })
      .addCase(loadCurrencies.rejected, (state) => {
        state.status = status.FAILED;
      });
  },
});

export const { setActiveCurrency } = currencySlice.actions;
export default currencySlice.reducer;
