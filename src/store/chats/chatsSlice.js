// Redux toolkit
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chats: [],
  activeChat: null,
};

export const chatsSlice = createSlice({
  name: 'chats',

  initialState,

  reducers: {
    onSetLoadingChats: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadChats: (state, { payload }) => {
      state.loading = false;
      state.chats = payload;
      state.activeChat = null;
    },

    onSetActiveChat: (state, { payload }) => {
      state.loading = false;
      state.activeChat = payload;
    },

    onAddNewChat: (state, { payload }) => {
      state.chats.push(payload);
      state.activeChat = null;
    },

    onUpdateChat: (state, { payload }) => {
      state.loading = false;
      state.chats = state.chats.map((chat) => {
        if (chat.chatId === payload.chatId) {
          return payload;
        }
        return chat;
      });
      state.activeChat = payload;
    },

    onDeleteChat: (state) => {
      state.loading = false;
      if (state.activeChat) {
        state.chats = state.chats.filter(
          (chat) => chat.chatId !== state.activeChat.chatId
        );
        state.activeChat = null;
      }
    },

    onLogOutChats: (state) => {
      state.chats = [];
      state.activeChat = null;
    },
  },
});

export const {
  onAddNewChat,
  onDeleteChat,
  onLoadChats,
  onLogOutChats,
  onSetActiveChat,
  onSetLoadingChats,
  onUpdateChat,
} = chatsSlice.actions;
