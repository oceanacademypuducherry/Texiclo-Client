import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer, collectionReducer, estimationReducer, productReducer, viewproductReducer } from '../redux';


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    collections: collectionReducer,
    products: productReducer,
    viewproduct:viewproductReducer,
    estimation: estimationReducer,
  },
   devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
