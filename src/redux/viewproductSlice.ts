// src/redux/viewproductSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  image: {
    frontImage: string;
    backImage: string;
    sleeveImage: string;
    Image: string; // If this is the same as sleeveImage, consider removing one
  };
  description: string;
  GSM: number[];         // List of GSM values
  color: string;         // If this should be multiple colors, use: string[]
  size: string;          // If this should be multiple sizes, use: string[]
  total: number;
  type: string;          // If this should be multiple types, use: string[]
  quantity: number;
  discount: number;
  productId: number;
}


interface ViewProductState {
  products: Product[];                                                                                                            
  selectedProduct: Product | null;
}

const initialState: ViewProductState = {
  products: [],
  selectedProduct: null,
};

const viewproductSlice = createSlice({
  name: "viewproduct",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    selectProductById: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setAllProducts, selectProductById, clearSelectedProduct } = viewproductSlice.actions;
export const viewproductReducer = viewproductSlice.reducer;
