// React

// Next

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Store actions
import { onSetActiveUser, onLoadUsers, onSetLoadingUsers } from '@/store';
import { useAuthStore } from './useAuthStore';

// Axios instance
import { projectApi } from '@/api';

export const useUsersStore = () => {
  //State
  const { users, activeUser, loading } = useSelector((state) => state.users);

  const { user } = useAuthStore();

  // Dispatch
  const dispatch = useDispatch();

  // Unset active post
  const unsetActiveUser = () => {
    dispatch(onSetActiveUser(null));
  };

  // Set active post
  const setActiveUser = (post) => {
    dispatch(onSetActiveUser(post));
  };

  // Get posts
  const startLoadingUsers = async () => {
    dispatch(onSetLoadingUsers(true));

    try {
      const { data } = await projectApi.get('/auth/all/users');

      // Load all users except the current user
      const filteredUsers = data.users.filter(
        (users) => users.uid !== user.uid
      );

      dispatch(onLoadUsers(filteredUsers));
      setActiveUser(filteredUsers[0]);
    } catch (error) {
      dispatch(onSetLoadingUsers(false));
      console.log('Error cargando los usuarios');
      console.log(error);
    }
  };

  return {
    // Properties
    users,
    activeUser,
    loading,

    // Methods
    setActiveUser,
    startLoadingUsers,
    unsetActiveUser,
  };
};
