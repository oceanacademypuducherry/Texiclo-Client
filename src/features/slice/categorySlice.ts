import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllCategoryAPI } from "../api/categoryAPI";

interface CategoryState {
  data: any[];
  meta: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    perPage: number;
  };
  isError: boolean;
  isLoading: boolean;
  status: string | null;
  message: string | null;
}

const initialState: CategoryState = {
  data: [],
  meta: {
    totalPages: 1,
    totalItems: 0,
    currentPage: 1,
    perPage: 4,
  },
  isError: false,
  isLoading: false,
  status: null,
  message: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCategoryAPI.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetAllCategoryAPI.fulfilled, (state, action: PayloadAction<any>) => {
        const { success, category, meta } = action.payload;
        state.isLoading = false;
        state.data = category;
        state.meta = meta;
        state.status = success ? "success" : "error";
        state.isError = !success;
      })
      .addCase(GetAllCategoryAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch categories";
        state.status = "error";
      });
  },
});

export const categoryReducer = categorySlice.reducer;
