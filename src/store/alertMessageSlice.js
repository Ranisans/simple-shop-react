/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const name = 'alert';
const initialState = {
  message: undefined,
};

export const alertMessageSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAlertMessage(state, action) {
      state.message = action.payload;
    },
    resetAlertMessage(state) {
      state.message = undefined;
    },
  },
});

export const { setAlertMessage, resetAlertMessage } = alertMessageSlice.actions;
export default alertMessageSlice.reducer;
