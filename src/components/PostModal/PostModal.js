/* eslint-disable @next/next/no-img-element */
// React

// Next
import Image from 'next/image';

// Mui
import { Modal } from '@mui/material';

// Hooks
import { useAuthStore, useForm, usePostsStore, useUiStore } from '@/hooks';

// Local Components
import { Avatar, Button, Input } from '../ui';
import { Loader } from '../Loader/Loader';

// Styles
import s from './PostModal.module.scss';

export const PostModal = () => {
  const { isModalOpen, openCloseModal } = useUiStore();

  const { user } = useAuthStore();

  const { activePost, loading, setActivePost, startSavingPost } =
    usePostsStore();

  const { message, onInputChange, onResetForm } = useForm({
    message: '',
  });

  const handlePublishComment = async () => {
    console.log(message);

    await startSavingPost({
      ...activePost,
      postComments: [
        ...activePost?.postComments,
        {
          id: Date.now(),
          username: user.username,
          photoURL: user.photoURL,
          message: message,
          date: new Date().toISOString().split('T')[0],
          likes: [],
        },
      ],
    });

    onResetForm();
  };

  const handleLikePost = async () => {
    await startSavingPost({
      ...activePost,
      postLikes: [
        ...activePost?.postLikes,
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
    const newLikes = activePost?.postLikes?.filter(
      (like) => like?.username !== user.username
    );

    await startSavingPost({
      ...activePost,
      postLikes: newLikes,
    });
  };

  const isUserLikedPost = activePost?.postLikes?.some(
    (like) => like?.username === user.username
  );

  return (
    <Modal
      // keepMounted
      disableScrollLock
      open={isModalOpen}
      onClose={() => {
        setActivePost(null);
        openCloseModal();
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className={s.postModal}>
          <header className={s.postModal__header}>
            <div className={s.postModal__header__user}>
              <Avatar
                src={activePost?.owner?.photoURL}
                alt={activePost?.owner?.username}
                size={30}
                className={s.postModal__header__avatar}
              />
              <p className={s.postModal__header__username}>
                {activePost?.owner?.username}
              </p>
            </div>

            <div
              onClick={() => {
                setActivePost(null);
                openCloseModal();
              }}
            >
              <Image
                src="/icons/globals/close.svg"
                alt="More"
                width={24}
                height={24}
                className={s.postModal__header__icon}
              />
            </div>
          </header>

          <div className={s.postModal__content}>
            <div className={s.postModal__content__img}>
              <img
                src={activePost?.postImg.url}
                alt={activePost?.postDesc}
                width="100%"
                className={s.postModal__content__img__img}
              />
            </div>
            <div className={s.postModal__content__info}>
              <div className={s.postModal__header__user}>
                <Avatar
                  src={activePost?.owner?.photoURL}
                  alt={activePost?.owner?.username}
                  size={30}
                  className={s.postModal__header__avatar}
                />
                <p className={s.postModal__header__username}>
                  {activePost?.owner?.username}
                </p>
              </div>

              <div className={s.postModal__content__info__desc}>
                <p className={s.postModal__content__info__desc__text}>
                  {activePost?.postDesc}
                </p>
                <p className={s.postModal__content__info__desc__date}>
                  {activePost?.postDate}
                </p>
              </div>

              <div className={s.postModal__content__info__comments}>
                {activePost?.postComments.length === 0 ? (
                  <p
                    className={
                      s.postModal__content__info__comments__comment__text
                    }
                  >
                    No hay comentarios
                  </p>
                ) : (
                  activePost?.postComments.map((comment, index) => (
                    <div
                      key={index}
                      className={s.postModal__content__info__comments__comment}
                    >
                      <Avatar
                        src={comment?.photoURL}
                        alt={comment?.username}
                        size={30}
                        className={s.postModal__content__info__comments__avatar}
                      />
                      <p
                        className={
                          s.postModal__content__info__comments__comment__text
                        }
                      >
                        <strong
                          className={
                            s.postModal__content__info__comments__comment__text__username
                          }
                        >
                          {comment?.username}
                        </strong>
                        {comment?.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <footer className={s.postModal__content__info__footer}>
                <div className={s.postModal__content__info__footer__actions}>
                  <div
                    className={
                      s.postModal__content__info__footer__actions__main
                    }
                  >
                    {isUserLikedPost ? (
                      <Image
                        onClick={handleDislikePost}
                        src="/icons/globals/liked.svg"
                        alt="Like"
                        width={44}
                        height={44}
                        className={
                          s.postModal__content__info__footer__actions__icon
                        }
                      />
                    ) : (
                      <Image
                        onClick={handleLikePost}
                        src="/icons/SideBarIcons/notificaciones.svg"
                        alt="Like"
                        width={44}
                        height={44}
                        className={
                          s.postModal__content__info__footer__actions__icon
                        }
                      />
                    )}
                    <Image
                      src="/icons/globals/comments.svg"
                      alt="Comment"
                      width={44}
                      height={44}
                      className={
                        s.postModal__content__info__footer__actions__icon
                      }
                    />
                    <Image
                      src="/icons/globals/enviar.svg"
                      alt="Send"
                      width={44}
                      height={44}
                      className={
                        s.postModal__content__info__footer__actions__icon
                      }
                    />
                  </div>

                  <div
                    className={
                      s.postModal__content__info__footer__actions__secondary
                    }
                  >
                    <Image
                      src="/icons/globals/save.svg"
                      alt="Send"
                      width={44}
                      height={44}
                      className={
                        s.postModal__content__info__footer__actions__icon__save
                      }
                    />
                  </div>
                </div>

                <div
                  className={s.postModal__content__info__footer__actions__likes}
                >
                  <p>
                    {activePost?.postLikes?.length} <span>Me gusta</span>
                  </p>
                </div>

                <div className={s.postModal__content__info__footer__form}>
                  <Input
                    name="message"
                    inputType="secondary"
                    placeholder="Escribe un comentario"
                    value={message}
                    onChange={onInputChange}
                    className={s.postModal__content__info__footer__form__input}
                  />
                  <Button
                    buttonType="primary"
                    onClick={handlePublishComment}
                    className={s.postModal__content__info__footer__form__button}
                  >
                    Publicar
                  </Button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
