import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services"; // Adjust path as needed

export const GetAllProductAPI = createAsyncThunk(
  "product/getAll",
  async (
    params: { categoryId?: string; collectionId?: string; page: number; search?: string },
    thunkAPI
  ) => {
    try {
      const { page, categoryId, collectionId, search = "" } = params;

      const response = await userAPI.post(
        `product/get/${page}`, 
        { categoryId, collectionId, search },  // ✅ include search
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
