/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect } from 'react';

//  HOC

// Local component

// Hooks
import { useAuthStore } from '@/hooks';

function withAuth(Component) {
  const Auth = (props) => {
    const { checkAuthToken } = useAuthStore();

    useEffect(() => {
      checkAuthToken();
    }, []);

    return <Component {...props} />;
  };

  return Auth;
}

export default withAuth;
