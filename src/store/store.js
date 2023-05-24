import { configureStore } from '@reduxjs/toolkit';

// Slices imports
import { postsSlice } from './posts/postsSlice';
import { authSlice } from './auth/authSlice';
import { profilesSlice } from './profiles/profilesSlice';
import { uiSlice } from './ui/uiSlice';
import { searchSlice } from './search/searchSlice';
import { usersSlice } from './users/usersSlice';
import { chatsSlice } from './chats/chatsSlice';
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postsSlice.reducer,
    profiles: profilesSlice.reducer,
    search: searchSlice.reducer,
    users: usersSlice.reducer,
    chats: chatsSlice.reducer,
    ui: uiSlice.reducer,
  },
});
