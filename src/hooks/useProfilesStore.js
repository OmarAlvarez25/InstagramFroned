// React
import { useState } from 'react';

// Next

// Redux actions
import {
  onSetActiveProfile,
  onSetActiveProfilePosts,
  onSetLoadingProfile,
  onUnsetActiveProfile,
  onU,
  onUpdateActiveProfile,
} from '@/store';

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Axios instance
import { projectApi } from '@/api';

export const useProfilesStore = () => {
  // Get active profile
  const { activeProfile, activeProfilePosts, loading } = useSelector(
    (state) => state.profiles
  );

  // Dispatch
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const setActiveUserPosts = async (id) => {
    dispatch(onSetLoadingProfile(true));

    try {
      const { data } = await projectApi.get(`/posts/post/owner/${id}`);

      if (data.posts) {
        dispatch(onSetActiveProfilePosts(data.posts));
      } else {
        dispatch(onSetActiveProfilePosts([]));
      }
    } catch (err) {
      console.log(err);
      dispatch(onSetActiveProfilePosts([]));
      // setError(err.response.data.msg);
    }
  };

  // Set active profile in store by username
  const setUserProfile = async (username) => {
    dispatch(onSetLoadingProfile(true));

    try {
      const { data } = await projectApi.get(`/auth/${username}`);

      if (data.user) {
        dispatch(onSetActiveProfile(data.user));
        setActiveUserPosts(data.user.uid);
        setError(null);
      } else {
        dispatch(onSetActiveProfile(null));
      }
    } catch (err) {
      console.log(err);
      dispatch(onSetActiveProfile(null));
      // setError(err.response.data.msg);
    }
  };

  // Unset active profile
  const unsetUserProfile = () => {
    dispatch(onUnsetActiveProfile());
  };

  // Edit user profile
  const startSavingActiveProfile = async (useForm) => {
    dispatch(onSetLoadingProfile(true));

    try {
      const { data } = await projectApi.put(`/auth/${useForm.uid}`, useForm);

      dispatch(onUpdateActiveProfile(data.user));
    } catch (err) {
      dispatch(onSetLoadingProfile(false));

      console.log(err);
    }
  };

  return {
    // Properties
    activeProfile,
    activeProfilePosts,
    loading,
    error,

    // Methods
    setUserProfile,
    unsetUserProfile,
    startSavingActiveProfile,
  };
};
