// src/redux/viewproductSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  image: {
    frontImage: string;
    backImage: string;
    sleeveImage: string;
    Image: string; 
  };
  description: string;
  GSM: number[];         
  color: string;        
  size: string;          
  total: number;
  type: string;          
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