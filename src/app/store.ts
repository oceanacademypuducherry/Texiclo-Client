// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import {
  categoryReducer,
  collectionReducer,
  estimationReducer,
  productReducer,
  viewproductReducer,
} from '../redux';
import { loadState, saveState } from "../utils/localstorage";

const preloadedState = loadState(); // Load from localStorage

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    collections: collectionReducer,
    products: productReducer,
    viewproduct: viewproductReducer,
    estimation: estimationReducer,
  },
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to save only `estimation` and `viewproduct.products`
store.subscribe(() => {
  saveState({
    estimation: store.getState().estimation,
    
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
