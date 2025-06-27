import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services"; // Adjust path as needed

export const GetAllProductAPI = createAsyncThunk(
  "product/getAll",
  async (
    params: { categoryId?: string; collectionId?: string; page: number },
    thunkAPI
  ) => {
    try {
      const { page, categoryId, collectionId } = params;

      const response = await userAPI.post(
        `http://localhost:3000/api/product/get/${page}`, 
        { categoryId, collectionId },                   
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; 
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);