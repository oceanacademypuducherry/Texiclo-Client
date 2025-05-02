import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const categoryReducer= categorySlice.reducer;
