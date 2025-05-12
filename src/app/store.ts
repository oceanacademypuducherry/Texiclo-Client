import { configureStore } from '@reduxjs/toolkit';
import { categoryReducer, collectionReducer, estimationReducer, productReducer } from '../redux';


export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    collections: collectionReducer,
    products: productReducer,
    estimation: estimationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
