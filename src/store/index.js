import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './categorySlice';
import currencyReducer from './currencySlice';
import activeProductReducer from './activeProductSlice';
import alertMessageReducer from './alertMessageSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    category: categoryReducer,
    currency: currencyReducer,
    activeProduct: activeProductReducer,
    alertMessage: alertMessageReducer,
    cart: cartReducer,
  },
});

export default store;
