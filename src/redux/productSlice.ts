import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  image: string;
  color: string;
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
      state.products = action.payload.map((product) => ({
        ...product,
        quantity: product.quantity ?? 1, 
      }));
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity = (product.quantity ?? 1) + 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const product = state.products.find(p => p.id === action.payload);
      if (product && (product.quantity ?? 1) > 1) {
        product.quantity = (product.quantity ?? 1) - 1;
      }
    },
  },
});

export const { setProducts, increaseQuantity, decreaseQuantity } = productSlice.actions;
export const productReducer = productSlice.reducer;
