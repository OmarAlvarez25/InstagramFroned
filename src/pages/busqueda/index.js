/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

// React
import { useEffect } from 'react';

// Next
import Link from 'next/link';

// Local Components
import withAuth from '@/auth/withAuth';
import { Layout, Loader, SearchBar } from '@/components';
import { Avatar } from '@/components/ui';

// Hooks
import { useSearchUsers } from '@/hooks';

// Styles
import s from './Busqueda.module.scss';

function Busqueda() {
  const { searchUsers, loading, error, startUnsetSearch } = useSearchUsers();

  useEffect(() => {
    return () => {
      startUnsetSearch();
    };
  }, []);

  return (
    <Layout pageTitle="Busqueda">
      <div className={s.busqueda}>
        <SearchBar />

        <h2>Resultados</h2>
        <div className={s.busqueda__results}>
          {loading ? (
            <Loader />
          ) : error ? (
            <h2>Hubo un error al cargar los usuarios</h2>
          ) : searchUsers?.length === 0 ? (
            <h2>No hay resultados</h2>
          ) : (
            searchUsers?.map((user) => (
              <Link
                href={`/perfil/${user.username}`}
                className={s.busqueda__results__item}
                key={user.uid}
              >
                <Avatar
                  src={user.photoURL}
                  username={user.name}
                  subText={user.username}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Busqueda);
