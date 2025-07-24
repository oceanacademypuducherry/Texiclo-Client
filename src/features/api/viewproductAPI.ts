import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services";

export const GetProductByIdAPI = createAsyncThunk(
  "product/viewById",
  async (productId: string, thunkAPI) => {
    try {
      const response = await userAPI.get(`http://localhost:3000/api/product/view/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
