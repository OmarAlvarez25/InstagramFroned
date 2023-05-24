// React

// Next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore } from '@/hooks';

// UI Components
import { Avatar } from '../ui';

// Styles
import s from './Sidebar.module.scss';

export function Sidebar() {
  const { user } = useAuthStore();

  const router = useRouter();

  const sideBarLinks = [
    {
      name: 'Inicio',
      icon: '/icons/SideBarIcons/home.svg',
      activeIcon: '/icons/SideBarIcons/home_active.svg',
      alt: 'Inicio',
      link: '/',
    },
    {
      name: 'Búsqueda',
      icon: '/icons/SideBarIcons/busqueda.svg',
      activeIcon: '/icons/SideBarIcons/busqueda_active.svg',
      alt: 'Busqueda',
      link: '/busqueda',
    },
    {
      name: 'Mensajes',
      icon: '/icons/SideBarIcons/mensaje.svg',
      activeIcon: '/icons/SideBarIcons/mensaje_active.svg',
      alt: 'Mensajes',
      link: '/mensajes',
    },
    /*{
      name: 'Notificaciones',
      icon: '/icons/SideBarIcons/notificaciones.svg',
      activeIcon: '/icons/SideBarIcons/notificaciones_active.svg',
      alt: 'Notificaciones',
      link: '/notificaciones',
    },*/
    {
      name: 'Crear',
      icon: '/icons/SideBarIcons/crear.svg',
      activeIcon: '/icons/SideBarIcons/crear_active.svg',
      alt: 'Crear post',
      link: '/crear',
    },
    // {
    //   name: 'Perfil',
    //   icon: '/icons/SideBarIcons/perfil.svg',
    //   activeIcon: '/icons/SideBarIcons/perfil_active.svg',
    //   alt: 'Perfil',
    //   link: '/perfil',
    // },
  ];

  return (
    <>
      <div className={s.sidebar}>
        <div className={s.sidebar__content}>
          <div className={s.sidebar__logo}>
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={103}
                height={29}
                className={s.sidebar__logo__img}
              />
            </Link>
          </div>
          <div className={s.sidebar__logo__short}>
            <Link href="/">
              <Image
                src="/logo/logo_short.png"
                alt="Logo"
                width={46}
                height={46}
                className={s.sidebar__logo__short__img}
              />
            </Link>
          </div>

          <ul className={s.sidebar__links}>
            {sideBarLinks.map((link, index) => (
              <Link
                href={link.link}
                key={index}
                className={s.sidebar__links__item}
              >
                <li className={s.sidebar__links__item__li}>
                  <Image
                    src={
                      router.pathname === link.link
                        ? link.activeIcon
                        : link.icon
                    }
                    alt={link.name}
                    width={25}
                    height={25}
                  />
                  <p className={s.sidebar__links__item__li__p}>{link.name}</p>
                </li>
              </Link>
            ))}

            <Link
              href={`/perfil/${user.username}`}
              className={s.sidebar__links__item}
            >
              <li className={s.sidebar__links__item__li}>
                <Avatar src={user?.photoURL} alt="Avatar" size={28} />
                <p className={s.sidebar__links__item__li__p}>Perfil</p>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
