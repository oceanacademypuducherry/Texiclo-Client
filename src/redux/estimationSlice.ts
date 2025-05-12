import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EstimationProduct {
  id: string;
  img: string;
  gsm: string;
  color: string;
  size: string;
  type: string;
  price: number;
}

interface EstimationState {
  products: EstimationProduct[];
}

const initialState: EstimationState = {
  products: [],
};

const estimationSlice = createSlice({
  name: 'estimation',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<EstimationProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    clearAll: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, clearAll } = estimationSlice.actions;

export const estimationReducer=estimationSlice.reducer;