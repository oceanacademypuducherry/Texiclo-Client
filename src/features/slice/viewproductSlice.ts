import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetProductByIdAPI } from "../api/viewproductAPI";


interface ViewProductState {
  product: any;
  isLoading: boolean;
  isError: boolean;
  message: string | null;
  relatedProduct :any
}

const initialState: ViewProductState = {
  product: null,
  isLoading: false,
  isError: false,
  message: null,
  relatedProduct: []
};

const viewProductSlice = createSlice({
  name: "view-product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetProductByIdAPI.pending, (state) => {
        state.isLoading = true;
        state.product = null;
        state.isError = false;
        state.message = null;
        state.relatedProduct = null;
      })
      .addCase(GetProductByIdAPI.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
       state.product = action.payload.data;
       state.relatedProduct = action.payload.relatedProducts

        state.isError = false;
      })
      .addCase(GetProductByIdAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch product";
      });
  },
});

export const viewProductReducer = viewProductSlice.reducer;
