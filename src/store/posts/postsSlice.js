// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  posts: [],
  activePost: null,
};

export const postsSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {
    onSetLoadingPosts: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadPosts: (state, { payload }) => {
      state.loading = false;

      payload.forEach((post) => {
        const exist = state.posts.some((act) => act.postId === post.postId);

        if (!exist) {
          state.posts.push(post);
        }
      });

      state.activePost = null;
    },

    onSetActivePost: (state, { payload }) => {
      state.loading = false;
      state.activePost = payload;
    },

    onAddNewPost: (state, { payload }) => {
      state.posts.push(payload);
      state.activePost = null;
    },

    onUpdatePost: (state, { payload }) => {
      state.loading = false;
      state.posts = state.posts.map((post) => {
        if (post.postId === payload.postId) {
          return payload;
        }
        return post;
      });
      state.activePost = payload;
    },

    onDeletePost: (state) => {
      state.loading = false;
      if (state.activePost) {
        state.posts = state.posts.filter(
          (post) => post.postId !== state.activePost.postId
        );
        state.activePost = null;
      }
    },

    onLogOutPosts: (state) => {
      state.posts = [];
      state.activePost = null;
    },
  },
});

export const {
  onAddNewPost,
  onDeletePost,
  onLoadPosts,
  onLogOutPosts,
  onSetActivePost,
  onSetLoadingPosts,
  onUpdatePost,
} = postsSlice.actions;
