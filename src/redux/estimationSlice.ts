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
  quantity: number; // ✅ Add this
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
  const existing = state.products.find(
    (p) => p.id === action.payload.id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    state.products.push({ ...action.payload, quantity: 1 });
  }
},

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    removeAllProducts: (state) => {
      state.products = [];
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  removeAllProducts,
  incrementQuantity,
  decrementQuantity,
} = estimationSlice.actions;

export const estimationReducer = estimationSlice.reducer;
