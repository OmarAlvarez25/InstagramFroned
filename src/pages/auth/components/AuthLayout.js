// React
import { useEffect } from 'react';

// Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// User Context
import { useAuthStore } from '@/hooks';

// Local Components
import withAuth from '@/auth/withAuth';
import { SEO } from '@/components';

// Styles
import s from '../styles/login.module.scss';

function AuthLayout({ children, title }) {
  // User Context Data
  const { status, user } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (user.uid !== undefined && status === 'authenticated') {
      router.replace('/');
    }
  }, [user, status, router]);

  return (
    <div className={s.login}>
      <SEO pageTitle={title} />

      <div className={s.login__form}>
        <div className={s.login__form__logo}>
          <Image
            src="/logo/logo.png"
            alt="Logo"
            className={s.login__form__logo__img}
            width={175}
            height={51}
            priority
          />
        </div>

        {children}
      </div>
    </div>
  );
}

export default withAuth(AuthLayout);
