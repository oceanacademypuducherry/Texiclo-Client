import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services";

// get active
export const GetAllCollectionAPI = createAsyncThunk(
  "collection",
  async (_, thunkAPI) => {
    try {
      
      const response = await userAPI.get(
        `collection/get`,
        {
          headers: {
            "Content-Type": "application/json",
           
          },
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);