// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Next
import { useRouter } from 'next/router';

// API Axios Call
import { projectApi } from '@/api';

// Redux Actions
import {
  checkingCredentials,
  login,
  logout,
  onLogOutPosts,
  onLogoutSearch,
  onUpdateUserProfile,
} from '@/store';

// Soonner Notifications
import { toast } from 'sonner';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const startLogout = async () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(onLogOutPosts());
    dispatch(onLogoutSearch());

    if (router.pathname !== '/auth/register') {
      router.replace('/auth/login');
    }
  };

  // Login
  const startLogin = async ({ email, password }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(
        login({
          uid: data.uid,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          bio: data.user.bio,
          photoURL: data.user.photoURL,
          following: data.user.following,
          followers: data.user.followers,
        })
      );
    } catch (error) {
      startLogout();
      toast.error('Credenciales incorrectas');
    }
  };

  // Register
  const startRegister = async ({
    name,
    email,
    password,
    username,
    bio,
    photoURL,
    following,
    followers,
  }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.post('/auth/new', {
        name,
        email,
        password,
        username,
        bio,
        photoURL,
        following,
        followers,
      });

      localStorage.setItem('token', data.token);

      dispatch(
        login({
          uid: data.uid,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          bio: data.user.bio,
          photoURL: data.user.photoURL,
          following: data.user.following,
          followers: data.user.followers,
        })
      );
    } catch (error) {
      startLogout();
      toast.error('Credenciales incorrectas');
    }
  };

  // Check auth token
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      startLogout();
      return;
    }

    try {
      const { data } = await projectApi.get('/auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(
        login({
          uid: data.uid,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          bio: data.user.bio,
          photoURL: data.user.photoURL,
          following: data.user.following,
          followers: data.user.followers,
        })
      );
    } catch (error) {
      startLogout();
      localStorage.clear();
    }
  };

  // Update user profile
  const startSavingProfile = async (profile) => {
    try {
      const { data } = await projectApi.put(`/auth/${profile.uid}`, profile);

      dispatch(onUpdateUserProfile(data.user));
    } catch (error) {
      // startLogout();
      // localStorage.clear();
      console.log(error);
    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken,
    startSavingProfile,
  };
};
