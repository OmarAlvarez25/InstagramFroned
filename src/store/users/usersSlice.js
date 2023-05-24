// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  users: [],
  activeUser: null,
};

export const usersSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    onSetLoadingUsers: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadUsers: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
      state.activeUser = null;
    },

    onSetActiveUser: (state, { payload }) => {
      state.loading = false;
      state.activeUser = payload;
    },

    onLogOutUsers: (state) => {
      state.users = [];
      state.activeUser = null;
    },
  },
});

export const {
  onDeletePost,
  onLoadUsers,
  onLogOutUsers,
  onSetActiveUser,
  onSetLoadingUsers,
} = usersSlice.actions;
