// bannerAPI.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

import { userAPI } from "../../services";

// Define async thunk
export const GetAllBannerAPI = createAsyncThunk(
  "banner/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.get("banner/get");
      return response.data.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch banners"
      );
    }
  }
);
