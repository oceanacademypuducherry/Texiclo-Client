import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  img: string;
  gsm: string;
  color: string;
  size: string;
  type: string;
  price: number;
}

interface EstimationState {
  products: Product[];
}

const initialState: EstimationState = {
  products: [],
};

const estimationSlice = createSlice({
  name: "estimation",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    clearAll: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, clearAll } = estimationSlice.actions;
export const estimationReducer=estimationSlice.reducer;