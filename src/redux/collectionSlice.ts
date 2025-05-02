import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Collection {
  id: number;
  categoryId: number;
  name: string;
  image: string;
}

interface CollectionState {
  collections: Collection[];
}

const initialState: CollectionState = {
  collections: [],
};

const collectionSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollections(state, action: PayloadAction<Collection[]>) {
      state.collections = action.payload;
    },
  },
});

export const { setCollections } = collectionSlice.actions;
export const collectionReducer=collectionSlice.reducer;
