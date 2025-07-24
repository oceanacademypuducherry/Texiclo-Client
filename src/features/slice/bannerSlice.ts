// bannerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllBannerAPI } from "../api/bannerAPI";

export interface BannerState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  message: string | null;
}

const initialState: BannerState = {
  data: [],
  isLoading: false,
  isError: false,
  message: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllBannerAPI.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = null;
        state.data = [];
      })
      .addCase(GetAllBannerAPI.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(GetAllBannerAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const bannerReducer = bannerSlice.reducer;
