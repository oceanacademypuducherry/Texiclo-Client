import { createSlice } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  image: {
    frontImage: string;
    backImage: string;
    sleeveImage: string;
  };
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
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
