// bannerAPI.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk
export const GetAllBannerAPI = createAsyncThunk(
  "banner/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/api/banner/get");
      return response.data.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Failed to fetch banners"
      );
    }
  }
);
