// React
import { useState } from 'react';

// Next

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';

// Store actions
import { onLoadSearchUsers, onSetLoadingSearch } from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

export const useSearchUsers = () => {
  //Get all activities by username
  const { searchUsers, loading } = useSelector((state) => state.search);

  // Dispatch
  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const startSearchingUser = async (search) => {
    dispatch(onSetLoadingSearch(true));

    try {
      const { data } = await projectApi.get(`/auth/search/${search}`);

      dispatch(onLoadSearchUsers(data.users));
    } catch (error) {
      dispatch(onSetLoadingSearch(false));
      console.log(error);
      setError(true);
      toast.error('Error cargando usuarios');
    }
  };

  const startUnsetSearch = () => {
    dispatch(onLoadSearchUsers([]));
  };

  return {
    // Properties
    searchUsers,
    loading,
    error,

    // Methods
    startSearchingUser,
    startUnsetSearch,
  };
};
