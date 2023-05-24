// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchUsers: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    onSetLoadingSearch: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadSearchUsers: (state, { payload }) => {
      state.loading = false;
      state.searchUsers = payload;
    },

    onLogoutSearch: (state) => {
      state.loading = false;
      state.searchUsers = [];
    },
  },
});

export const { onSetLoadingSearch, onLoadSearchUsers, onLogoutSearch } =
  searchSlice.actions;
