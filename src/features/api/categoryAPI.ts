import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../../services";




// export const GetAllCategoryAPI = createAsyncThunk(
//   "category",
//   async (
//     { page = 1, search = "" }: { page?: number; search?: string },
//     thunkAPI
//   ) => {
//     try {
//       const response = await userAPI.get(
//         `http://localhost:3000/api/collection/category/get?page=${page}&search=${search}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const GetAllCategoryAPI = createAsyncThunk(
  "category",
  async (
   {
    page,
    search = "",
    withMeta = true,
  }: { page?: number; search?: string; withMeta?: boolean },
    thunkAPI
  ) => {
    try {
      const query = `page=${page || 1}&search=${search}&withMeta=${withMeta}`;
  const response = await userAPI.get(`collection/category/get?${query}`);
  return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


