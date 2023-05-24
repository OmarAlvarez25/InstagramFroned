// React Imports
import { useState } from 'react';

// Next Imports
import Link from 'next/link';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import AuthLayout from './components/AuthLayout';

// UI Component
import { Button, Input } from '@/components/ui';

// Styles
import s from './styles/login.module.scss';

// Sonner Notification
import { toast } from 'sonner';

function Register() {
  // User Context Data
  const { startRegister } = useAuthStore();

  const { name, email, password, username, onInputChange, formState } = useForm(
    {
      name: '',
      email: '',
      password: '',
      username: '',
    }
  );

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    startRegister({
      name,
      email,
      password,
      username,
      bio: '',
      photoURL: `https://source.boringavatars.com/marble/50/${username}`,
      following: [],
      followers: [],
    });
  };

  return (
    <AuthLayout title="Registro">
      <form className={s.login__form__container} onSubmit={handleSubmit}>
        <Input
          type="text"
          inputType="secondary"
          name="name"
          className={s.login__form__input}
          defaultValue={name}
          required
          placeholder="Nombre Completo"
          onChange={onInputChange}
        />

        <Input
          type="email"
          inputType="secondary"
          name="email"
          className={s.login__form__input}
          defaultValue={email}
          required
          placeholder="Correo electronico"
          onChange={onInputChange}
        />

        <Input
          type="text"
          inputType="secondary"
          name="username"
          className={s.login__form__input}
          defaultValue={username}
          required
          placeholder="Nombre de usuario"
          onChange={onInputChange}
        />

        <Input
          type="password"
          inputType="secondary"
          name="password"
          className={s.login__form__input}
          defaultValue={password}
          required
          placeholder="Contraseña"
          onChange={onInputChange}
        />

        <Button className={s.login__form__button} type="submit">
          Registrate
        </Button>
        <div className={s.login__form__footer}>
          <p className={s.login__form__footer__text}>
            ¿Ya tienes una cuenta? <Link href="/auth/login">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Register;
