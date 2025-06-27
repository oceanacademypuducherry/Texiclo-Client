import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllProductAPI } from "../api/productAPI";

export interface ProductState {
  data: any;
  isError: boolean;
  isLoading: boolean;
  status: string | null;
  message: string | null;
}

const initialState: ProductState = {
  data: null,
  isError: false,
  isLoading: false,
  status: null,
  message: null,
};

const productSlice = createSlice({
  name: "/get-product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProductAPI.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.message = null;
        state.status = null;
      })
      .addCase(GetAllProductAPI.fulfilled, (state, action: PayloadAction<any>) => {
        const { success, productValues,meta } = action.payload;
        state.isLoading = false;
        state.data = { productValues,meta }; // store productValues for frontend access
        state.status = success ? "success" : "error";
        state.isError = !success;
      })
      .addCase(GetAllProductAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch products";
        state.status = "error";
      });
  },
});

export const productReducer = productSlice.reducer;
