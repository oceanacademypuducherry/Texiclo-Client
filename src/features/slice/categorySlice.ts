import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllCategoryAPI } from "../api/categoryAPI";

export interface CategoryState {
  data: object | null;
  isError: boolean;
  isLoading: boolean;
  status: string | null;
  message: string | null;
}

export interface CandidatePayloadAction {
  data: object;
  message: string;
  status: string;
}

const initialState: CategoryState = {
  data: null,
  isError: false,
  isLoading: false,
  status: null,
  message: null,
};

const categorySlice = createSlice({
  name: "/get-category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCategoryAPI.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.message = null;
        state.status = null;
      })
      .addCase(
        GetAllCategoryAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { success, category } = action.payload;
          state.isLoading = false;
          state.data = category;
          state.message = null;
          state.status = success ? "success" : "error";
          state.isError = !success;
        }
      )

      .addCase(GetAllCategoryAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch category";
        state.status = "error";
      });
  },
});

export const categoryReducer = categorySlice.reducer;
