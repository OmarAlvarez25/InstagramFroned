/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';
// hooks
import {
  useAuthStore,
  usePostsStore,
  useProfilesStore,
  useUiStore,
} from '@/hooks';

// Local Components
import withAuth from '@/auth/withAuth';
import { Layout, Loader, PostModal } from '@/components';

// UI Components
import { Avatar, Button } from '@/components/ui';

// Styles
import s from './perfil.module.scss';

function Perfil() {
  const { user, startLogout, startSavingProfile } = useAuthStore();

  const router = useRouter();

  const { username } = router.query;

  const { setActivePost } = usePostsStore();
  const { openCloseModal } = useUiStore();

  const {
    activeProfile,
    activeProfilePosts,
    loading,
    error,
    setUserProfile,
    unsetUserProfile,
    startSavingActiveProfile,
  } = useProfilesStore();

  const handleFollow = async () => {
    await startSavingProfile({
      ...user,
      following: [...user?.following, activeProfile?.uid],
    });

    await startSavingActiveProfile({
      ...activeProfile,
      followers: [...activeProfile?.followers, user.uid],
    });
  };

  const handleUnfollow = async () => {
    await startSavingProfile({
      ...user,
      following: user?.following.filter(
        (following) => following !== activeProfile?.uid
      ),
    });

    await startSavingActiveProfile({
      ...activeProfile,
      followers: activeProfile?.followers.filter(
        (follower) => follower !== user.uid
      ),
    });
  };

  useEffect(() => {
    setUserProfile(username);

    return () => {
      unsetUserProfile();
    };
  }, [username]);

  return (
    <Layout pageTitle="Perfil">
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className={s.perfil}>
          <div className={s.perfil__info}>
            <div className={s.perfil__info__avatar}>
              <Avatar
                src={activeProfile?.photoURL}
                size={150}
                className={s.perfil__avatar}
              />
            </div>

            <div className={s.perfil__info__content}>
              <div className={s.perfil__info__content__username}>
                <h1 className={s.perfil__info__content__username__text}>
                  {activeProfile?.username}
                </h1>
                {user.username === username ? (
                  <Button
                    onClick={startLogout}
                    className={s.perfil__logout__button}
                  >
                    Cerrar Sesión
                  </Button>
                ) : user?.following?.includes(activeProfile?.uid) ? (
                  <Button className={s.perfil__follow} onClick={handleUnfollow}>
                    Dejar de seguir
                  </Button>
                ) : (
                  <Button className={s.perfil__follow} onClick={handleFollow}>
                    Seguir
                  </Button>
                )}
              </div>

              <p>{activeProfile?.name}</p>
              <div className={s.perfil__info__content__stats}>
                <p>{activeProfilePosts?.length} publicaciones</p>
                <p>{activeProfile?.followers.length} seguidores</p>
                <p>{activeProfile?.following.length} seguidos</p>
              </div>

              <div className={s.perfil__info__content__bio}>
                <p>{activeProfile?.bio}</p>
              </div>
            </div>
          </div>

          <div className={s.perfil__posts}>
            {activeProfilePosts.length === 0 ? (
              <h1>No hay publicaciones</h1>
            ) : (
              activeProfilePosts.map((post) => (
                <div
                  key={post.postId}
                  className={s.perfil__posts__item}
                  onClick={async () => {
                    await setActivePost(post);
                    openCloseModal();
                  }}
                >
                  <img
                    src={post.postImg.url}
                    alt={post.postDesc}
                    className={s.perfil__posts__item__image}
                    width="100%"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <PostModal />
    </Layout>
  );
}

export default withAuth(Perfil);
