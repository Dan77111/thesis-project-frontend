import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  activePage: 'indicators',
};

export const activePageSlice = createSlice({
  name: 'activePage',
  initialState,
  reducers: {
    changeActivePage(state, action: PayloadAction<string>) {
      state.activePage = action.payload;
    },
  },
});

export const { changeActivePage } = activePageSlice.actions;
export const activePageReducer = activePageSlice.reducer;
