// estimationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  img: string;
  name: string;
  gsm: string;
  color: string;
  size: string;
  type: string;
  price: number;
  total: number;
  discount: number;
  description: string;
  originalPrice: number;
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
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    removeAllProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, removeProduct, removeAllProducts } = estimationSlice.actions;
export const estimationReducer = estimationSlice.reducer;
