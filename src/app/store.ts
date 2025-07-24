

import { configureStore } from '@reduxjs/toolkit';
import { estimationReducer } from '../features/slice/estimationSlice';
import { loadState, saveState } from '../../src/utils/localstorage'; // ✅
import { bannerReducer, categoryReducer, collectionReducer,productReducer,viewProductReducer } from '../features/slice';



const persistedState = loadState(); // ✅ Load from localStorage

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    collections: collectionReducer,
    product: productReducer,
    viewProduct: viewProductReducer,
    // viewproduct: viewproductReducer,
    estimation: estimationReducer,
     banner: bannerReducer,
  },
  preloadedState: persistedState, // ✅ Inject persisted data
});

store.subscribe(() => {
  saveState(store.getState()); // ✅ Save to localStorage on any update
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

