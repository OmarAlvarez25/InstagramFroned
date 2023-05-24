// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'not-authenticated', // checking, authenticated, not-authenticated
  user: {
    uid: undefined,
    name: undefined,
    email: undefined,
    username: undefined,
    bio: undefined,
    photoURL: undefined,
    following: undefined,
    followers: undefined,
  },
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkingCredentials: (state) => {
      state.status = 'checking';
      state.user = {
        uid: undefined,
        name: undefined,
        email: undefined,
        username: undefined,
        bio: undefined,
        photoURL: undefined,
        following: undefined,
        followers: undefined,
      };
      // state.errorMessage = undefined;
    },

    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user.uid = payload.uid;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.username = payload.username;
      state.user.bio = payload.bio;
      state.user.photoURL = payload.photoURL;
      state.user.following = payload.following;
      state.user.followers = payload.followers;
    },

    logout: (state) => {
      state.status = 'not-authenticated';
      state.user.uid = undefined;
      state.user.name = undefined;
      state.user.email = undefined;
      state.user.username = undefined;
      state.user.bio = undefined;
      state.user.photoURL = undefined;
      state.user.following = undefined;
      state.user.followers = undefined;
    },

    onUpdateUserProfile: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  login,
  logout,
  onUpdateUserProfile,
  checkingCredentials,
  clearErrorMessage,
} = authSlice.actions;
