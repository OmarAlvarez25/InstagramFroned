// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  activeProfile: null,
  activeProfilePosts: [],
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    onSetLoadingProfile: (state, { payload }) => {
      state.loading = payload;
    },

    onSetActiveProfile: (state, { payload }) => {
      state.loading = false;
      state.activeProfile = payload;
    },

    onSetActiveProfilePosts: (state, { payload }) => {
      state.loading = false;
      state.activeProfilePosts = payload;
    },

    onUnsetActiveProfile: (state) => {
      state.loading = false;
      state.activeProfile = null;
      state.activeProfilePosts = [];
    },

    onUpdateActiveProfile: (state, { payload }) => {
      state.loading = false;

      if (state.activeProfile) {
        state.activeProfile = payload;
      }
    },
  },
});

export const {
  onSetActiveProfile,
  onSetActiveProfilePosts,
  onSetLoadingProfile,
  onUnsetActiveProfile,
  onUpdateActiveProfile,
} = profilesSlice.actions;
