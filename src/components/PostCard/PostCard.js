/* eslint-disable @next/next/no-img-element */
// Next
import Image from 'next/image';

// Hooks
import { useAuthStore, useForm, usePostsStore, useUiStore } from '@/hooks';

// UI Components
import { Avatar, Button, Input } from '../ui';
import { PostModal } from '../PostModal/PostModal';

// Styles
import s from './PostCard.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';

export const PostCard = ({ post }) => {
  const { openCloseModal } = useUiStore();

  const { setActivePost, startSavingPost } = usePostsStore();

  const { user } = useAuthStore();

  const { message, onInputChange, onResetForm } = useForm({
    message: '',
  });

  const handlePublishComment = async () => {
    await startSavingPost({
      ...post,
      postComments: [
        ...post?.postComments,
        {
          id: Date.now(),
          username: user.username,
          photoURL: user.photoURL,
          message: message,
          date: Date.now(),
          likes: [],
        },
      ],
    });

    onResetForm();
  };

  const handleLikePost = async () => {
    await startSavingPost({
      ...post,
      postLikes: [
        ...post?.postLikes,
        {
          id: Date.now(),
          username: user.username,
          photoURL: user.photoURL,
          name: user.name,
        },
      ],
    });
  };

  const handleDislikePost = async () => {
    const newLikes = post?.postLikes?.filter(
      (like) => like?.username !== user.username
    );

    await startSavingPost({
      ...post,
      postLikes: newLikes,
    });
  };

  const isUserLikedPost = post?.postLikes?.some(
    (like) => like?.username === user.username
  );

  return (
    <div className={s.card} key={post?.postId}>
      {/* <div className={s.card__header}> */}
      <Link
        href={`/perfil/${post?.owner?.username}`}
        className={s.card__header}
      >
        <Avatar
          src={post?.owner?.photoURL}
          alt={post?.owner?.username}
          size={30}
          className={s.card__header__avatar}
        />
        <p className={s.card__header__username}>{post?.owner?.username}</p>
      </Link>
      {/* </div> */}

      <div className={s.card__image}>
        <img
          src={post?.postImg.url}
          alt={post?.postDesc}
          width="100%"
          className={s.card__image__img}
        />
      </div>

      <div className={s.card__footer}>
        <div className={s.card__footer__actions}>
          <div className={s.card__footer__actions__main}>
            {isUserLikedPost ? (
              <Image
                onClick={handleDislikePost}
                src="/icons/globals/liked.svg"
                alt="Like"
                width={44}
                height={44}
                className={s.card__footer__actions__icon}
              />
            ) : (
              <Image
                onClick={handleLikePost}
                src="/icons/SideBarIcons/notificaciones.svg"
                alt="Like"
                width={44}
                height={44}
                className={s.card__footer__actions__icon}
              />
            )}
            <Image
              onClick={async () => {
                await setActivePost(post);
                openCloseModal();
              }}
              src="/icons/globals/comments.svg"
              alt="Comment"
              width={44}
              height={44}
              className={s.card__footer__actions__icon}
            />
            {/*<Image
              src="/icons/globals/enviar.svg"
              alt="Send"
              width={44}
              height={44}
              className={s.card__footer__actions__icon}
            />*/}
          </div>

          <div className={s.card__footer__actions__secondary}>
            <Image
              src="/icons/globals/save.svg"
              alt="Send"
              width={44}
              height={44}
              className={s.card__footer__actions__icon__save}
            />
          </div>
        </div>

        <div className={s.card__footer__actions__likes}>
          <p>
            {post?.postLikes?.length} <span>Me gusta</span>
          </p>
        </div>

        <div className={s.card__footer__actions__desc}>
          <p>
            <strong>{post?.owner?.username}</strong>
          </p>
          <p>{post?.postDesc}</p>
        </div>

        {post?.postComments?.length > 2 && (
          <div
            className={s.card__footer__actions__viewComments}
            onClick={async () => {
              await setActivePost(post);
              openCloseModal();
            }}
          >
            <p>Ver los {post?.postComments?.length} comentarios</p>
          </div>
        )}

        {post?.postComments?.length === 0 ? (
          <div
            className={s.card__footer__actions__viewComments}
            onClick={async () => {
              await setActivePost(post);
              openCloseModal();
            }}
          >
            <p>No hay comentarios</p>
          </div>
        ) : (
          post?.postComments?.slice(0, 2).map((comment) => (
            <div
              className={s.card__footer__actions__comments}
              key={comment?.id}
            >
              <div className={s.card__footer__actions__comments__item}>
                <p>
                  <strong>{comment?.username}</strong> {comment?.message}
                </p>

                {/* <div
                  className={s.card__footer__actions__comments__item__actions}
                >
                  <Image
                    src="/icons/SideBarIcons/notificaciones.svg"
                    alt="Like"
                    width={15}
                    height={15}
                    className={
                      s.card__footer__actions__comments__item__actions__icon
                    }
                  />
                </div> */}
              </div>
            </div>
          ))
        )}

        <div className={s.card__footer__actions__addComment}>
          <Input
            name="message"
            inputType="secondary"
            placeholder="Escribe un comentario"
            value={message}
            onChange={onInputChange}
            className={s.card__footer__actions__addComment__input}
          />
          <Button
            buttonType="primary"
            onClick={handlePublishComment}
            className={s.card__footer__actions__addComment__button}
          >
            Publicar
          </Button>
        </div>
      </div>

      <PostModal />
    </div>
  );
};
