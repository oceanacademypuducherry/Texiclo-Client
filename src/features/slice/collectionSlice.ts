import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllCollectionAPI } from "../api/collectionAPI";

export interface CollectionTypeState {
  data: object | null;
  isError: boolean;
  isLoading: boolean;
  status: string | null;
  message: string | null;
}

export interface CollectionPayloadAction {
  data: object;
  message: string;
  status: string;
}

const initialState: CollectionTypeState = {
  data: null,
  isError: false,
  isLoading: false,
  status: null,
  message: null,
};

const collectionTypeSlice = createSlice({
  name: "/get-collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCollectionAPI.pending, (state) => {
        state.isLoading = true;
        state.data = null;
        state.message = null;
        state.status = null;
      })
      .addCase(
        GetAllCollectionAPI.fulfilled,
        (state, action: PayloadAction<any>) => {
          const { success, collectionType} = action.payload;
          state.isLoading = false;
          state.data = collectionType;
          state.message = null;
          state.status = success ? "success" : "error";
          state.isError = !success;
        }
      )

      .addCase(GetAllCollectionAPI.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch collection";
        state.status = "error";
      });
  },
});

export const collectionReducer = collectionTypeSlice.reducer;
