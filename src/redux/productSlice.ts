import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  image: string;
//   description: string;
//   gsm: number;
  color: string;
//   size: string;
  type: string;
  price: number;
  quantity?: number;
  categoryId: number;
  collectionId: number;
}

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export const productReducer= productSlice.reducer;
