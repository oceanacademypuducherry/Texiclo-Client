// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer } from '../features/slice/categorySlice';
import {  estimationReducer, viewproductReducer } from '../redux';
import { collectionReducer } from '../features/slice/collectionSlice';
import { productReducer } from '../features/slice/productSlice';

// import {
//   categoryReducer,
//   collectionReducer,
//   estimationReducer,
//   productReducer,
//   viewproductReducer,
// } from '../redux';


export const store = configureStore({
  reducer: {
    category: categoryReducer,
    // categories: categoryReducer,
    collections: collectionReducer,
    product: productReducer,
    viewproduct: viewproductReducer,
    estimation: estimationReducer,
  },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
