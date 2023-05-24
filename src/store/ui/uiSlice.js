import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenCloseModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { onOpenCloseModal } = uiSlice.actions;
