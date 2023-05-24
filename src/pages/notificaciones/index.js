// Local Components
import withAuth from '@/auth/withAuth';
import { Layout } from '@/components';

// UI Components
import { Avatar } from '@/components/ui';

// Styles
import s from './Notificaciones.module.scss';

// Fake data
import { fakePosts } from '@/data/post';

function Notificaciones() {
  return (
    <Layout pageTitle="Notificaciones">
      <div className={s.notificaciones}>
        <h1 className={s.notificaciones__title}>Notificaciones</h1>

        <div className={s.notificaciones__container}>
          {fakePosts.map((post) => (
            <div className={s.notificaciones__container__item} key={post.id}>
              <div className={s.notificaciones__container__item__info}>
                <Avatar
                  src={`https://source.boringavatars.com/marble/120/${post.ownerName}`}
                  size={44}
                  className={s.notificaciones__container__item__info__avatar}
                  classNameText={
                    s.notificaciones__container__item__info__avatar__text
                  }
                />

                <p className={s.notificaciones__container__item__info__text}>
                  A{' '}
                  <span
                    className={
                      s.notificaciones__container__item__info__text__bold
                    }
                  >
                    {post.ownerUserName}{' '}
                  </span>
                  le ha gustado tu publicación.
                </p>
              </div>

              <p
                className={s.notificaciones__container__item__info__text__time}
              >
                {post.postLikes}h
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Notificaciones);
