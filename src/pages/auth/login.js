// React
import { useEffect, useMemo } from 'react';

// Next
import Link from 'next/link';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import AuthLayout from './components/AuthLayout';

// UI Component
import { Button, Input } from '@/components/ui';

// Sonner Notification
import { toast } from 'sonner';

// Styles
import s from './styles/login.module.scss';

function Login() {
  const { status, startLogin } = useAuthStore();

  const { email, password, onInputChange, formState } = useForm({
    email: '',
    password: '',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onLogin = (e) => {
    e.preventDefault();

    startLogin({ email, password });
  };

  return (
    <AuthLayout title="Iniciar Sesión">
      <form className={s.login__form__container} onSubmit={onLogin}>
        <Input
          type="email"
          inputType="secondary"
          label="Usuario"
          name="email"
          className={s.login__form__input}
          defaultValue={email}
          required
          placeholder="Correo electronico"
          onChange={onInputChange}
        />

        <Input
          type="password"
          inputType="secondary"
          label="Contraseña"
          name="password"
          className={s.login__form__input}
          defaultValue={password}
          required
          placeholder="Contraseña"
          onChange={onInputChange}
        />

        <Button
          className={s.login__form__button}
          type="submit"
          disabled={isAuthenticating}
        >
          {status === 'checking' ? 'Cargando...' : 'Iniciar Sesión'}
        </Button>

        <div className={s.login__form__footer}>
          <p className={s.login__form__footer__text}>
            ¿No tienes una cuenta? <Link href="/auth/register">Registrate</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
