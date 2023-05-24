// React
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Store actions
import {
  onAddNewPost,
  onUpdatePost,
  onSetActivePost,
  onLoadPosts,
  onSetLoadingPosts,
  onDeletePost,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Helpers
import { fileUpload } from '@/helpers';

export const usePostsStore = () => {
  //State
  const { posts, activePost, loading } = useSelector((state) => state.posts);
  // Dispatch
  const dispatch = useDispatch();

  // Router
  const router = useRouter();
  const [error, setError] = useState();

  // Unset active post
  const unsetActivePost = () => {
    dispatch(onSetActivePost(null));
  };

  // Get posts
  const startLoadingPosts = async () => {
    dispatch(onSetLoadingPosts(true));

    try {
      const { data } = await projectApi.get('/posts');

      dispatch(onLoadPosts(data.posts));
    } catch (error) {
      dispatch(onSetLoadingPosts(false));
      console.log('Error cargando publicaciones');
      console.log(error);
    }
  };

  // VER ESTAS DOS FUNCIONES

  // Get post by ID
  const setPostByID = async (id) => {
    dispatch(onSetLoadingPosts(true));

    try {
      const { data } = await projectApi.get(`/posts/post/${id}`);

      if (data.post) {
        dispatch(onSetActivePost(data.post));
        setError(null);
      } else {
        unsetActivePost();
        setError('No se encontró la publicacion');
      }
    } catch (error) {
      unsetActivePost();
      console.log(error);
    }
  };

  // Set active post
  const setActivePost = (post) => {
    dispatch(onSetActivePost(post));
    // router.replace('/crear');
  };

  // VER ESTAS DOS FUNCIONES

  const startUploadingFiles = async (files) => {
    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const filesData = await Promise.all(fileUploadPromises);

    // toast.success('Archivo(s) subido(s) con éxito');

    return filesData;
  };

  // Delete single file
  const startDeletingFile = async (id) => {
    try {
      await projectApi.delete(`/posts/file/${id}`);
      toast.success('Archivo eliminado con éxito');
    } catch (error) {
      console.log(error);
    }
  };

  // Saving posts
  const startSavingPost = async (postForm) => {
    try {
      if (postForm.postId) {
        // Update post
        await projectApi.put(`/posts/post/${postForm.postId}`, postForm);

        dispatch(onUpdatePost(postForm));

        // Update post notification
        // toast.success('Publicacion actualizada con éxito');
        // router.back();
        return;
      }

      // Add new post
      const { data } = await projectApi.post('/posts', postForm);

      dispatch(
        onAddNewPost({
          ...postForm,
          postId: data.post.postId,
        })
      );

      router.push('/');

      // New post notification
      toast.success('Publicacion creada con éxito');
    } catch (error) {
      dispatch(onSetLoadingPosts(false));
      console.log(error);
    }
  };

  // Delete post
  const startDeletingPost = async () => {
    dispatch(onSetLoadingPosts(true));
    try {
      await projectApi.delete(`/posts/delete/${activePost.postId}`);
      dispatch(onDeletePost());
      toast.success('Publicacion eliminada con éxito');
      router.reload();
    } catch (error) {
      dispatch(onSetLoadingPosts(false));
      console.log(error);
    }
  };

  return {
    // Properties
    posts,
    activePost,
    loading,
    error,

    // Methods
    setActivePost,
    setPostByID,
    startDeletingPost,
    startLoadingPosts,
    startSavingPost,
    startUploadingFiles,
    startDeletingFile,
    unsetActivePost,
  };
};
