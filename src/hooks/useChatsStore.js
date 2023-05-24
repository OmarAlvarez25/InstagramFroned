// React
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Store actions
import {
  onAddNewChat,
  onUpdateChat,
  onSetActiveChat,
  onLoadChats,
  onSetLoadingChats,
  onDeleteChat,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

import { useAuthStore } from './useAuthStore';

export const useChatsStore = () => {
  //State
  const { chats, activeChat, loading } = useSelector((state) => state.chats);

  const { user } = useAuthStore();

  // Dispatch
  const dispatch = useDispatch();

  // Router
  const router = useRouter();
  const [error, setError] = useState();

  // Unset active post
  const unsetActiveChat = () => {
    dispatch(onSetActiveChat(null));
  };

  // Set active chat
  const setActiveChat = (chat) => {
    dispatch(onSetActiveChat(chat));
    // router.replace('/crear');
  };

  // Get posts
  const startLoadingChats = async () => {
    dispatch(onSetLoadingChats(true));

    try {
      const { data } = await projectApi.get(`/chats/${user.uid}`);

      dispatch(onLoadChats(data.chats));
      setActiveChat(data.chats[0]);
    } catch (error) {
      dispatch(onSetLoadingChats(false));
      console.log('Error cargando publicaciones');
      console.log(error);
    }
  };

  // Get chat by ID
  const setChatByID = async (id) => {
    dispatch(onSetLoadingChats(true));

    try {
      const { data } = await projectApi.get(`/chats/chat/${id}`);

      if (data.chat) {
        dispatch(onSetActiveChat(data.chat));
        setError(null);
      } else {
        dispatch(onSetActiveChat(null));
        setError('No se encontró el chat');
      }
    } catch (error) {
      dispatch(onSetActiveChat(null));
      console.log(error);
    }
  };

  // Saving posts
  const startSavingChat = async (chatForm) => {
    try {
      if (chatForm.chatId) {
        // Update post
        await projectApi.put(`/chats/${chatForm.chatId}`, chatForm);

        dispatch(onUpdateChat(chatForm));

        setChatByID(chatForm.chatId);

        return;
      }

      // Add new post
      const { data } = await projectApi.post('/chats', chatForm);

      dispatch(
        onAddNewChat({
          ...chatForm,
          chatId: data.chatId,
        })
      );

      startLoadingChats();

      // New post notification
      toast.success('Chat creado con éxito');
    } catch (error) {
      dispatch(onSetLoadingChats(false));
      console.log(error);
    }
  };

  // Delete post
  const startDeletingPost = async () => {
    dispatch(onSetLoadingChats(true));
    try {
      await projectApi.delete(`/posts/delete/${activeChat.postId}`);
      dispatch(onDeleteChat());
      toast.success('Publicacion eliminada con éxito');
      router.reload();
    } catch (error) {
      dispatch(onSetLoadingChats(false));
      console.log(error);
    }
  };

  return {
    // Properties
    chats,
    activeChat,
    loading,
    error,

    // Methods
    setActiveChat,
    setChatByID,
    startDeletingPost,
    startLoadingChats,
    startSavingChat,
    unsetActiveChat,
  };
};
