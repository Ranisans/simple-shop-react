/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const name = 'cartBox';
const initialState = { visible: false };

export const cartBoxSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeVisibility(state) {
      state.visible = !state.visible;
    },
  },
});

export const { changeVisibility } = cartBoxSlice.actions;
export default cartBoxSlice.reducer;
