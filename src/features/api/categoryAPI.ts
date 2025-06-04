import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services";

// get active
export const GetAllCategoryAPI = createAsyncThunk(
  "category",
  async (_, thunkAPI) => {
    try {
      
      const response = await userAPI.get(
        `http://localhost:3000/api/collection/category/get`,
        {
          headers: {
            "Content-Type": "application/json",
           
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);