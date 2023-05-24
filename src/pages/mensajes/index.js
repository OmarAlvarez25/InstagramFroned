/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Next
import Link from 'next/link';

// hooks
import {
  useAuthStore,
  useChatsStore,
  useForm,
  useUiStore,
  useUsersStore,
} from '@/hooks';

// Local Components
import withAuth from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import CreateChatModal from './components/CreateChatModal/CreateChatModal';

// UI Components
import { Avatar, Button, Input } from '@/components/ui';

// Styles
import s from './Mensajes.module.scss';

function Mensajes() {
  const { user } = useAuthStore();

  const { loading, startLoadingUsers } = useUsersStore();

  const {
    chats,
    activeChat,
    startLoadingChats,
    setActiveChat,
    startSavingChat,
  } = useChatsStore();

  const { openCloseModal } = useUiStore();

  const { message, formState, onInputChange, onResetForm } = useForm({
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      ...activeChat,

      chat: {
        ...activeChat?.chat,
        messages: [
          ...activeChat?.chat?.messages,
          {
            message: message,
            sender: user.uid,
          },
        ],
      },
    };

    startSavingChat(newMessage);

    onResetForm();
  };

  useEffect(() => {
    startLoadingUsers();
    startLoadingChats();
  }, []);

  return (
    <Layout pageTitle="Mensajes">
      <div className={s.mensajes}>
        <div className={s.mensajes__container}>
          <div className={s.mensajes__container__header}>
            <h1>{user.username}</h1>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className={s.mensajes__container__body}>
              {chats?.map((chat, index) => (
                <div
                  key={index}
                  className={`${s.mensajes__container__body__item}
                  ${activeChat?.chatId === chat?.chatId && s.active}
                  `}
                  onClick={() => {
                    setActiveChat(chat);
                  }}
                >
                  <Avatar
                    src={
                      user.uid === chat?.chat?.user2?._id
                        ? chat?.chat?.user1?.photoURL
                        : chat?.chat?.user2?.photoURL
                    }
                    username={
                      user.uid === chat?.chat?.user2?._id
                        ? chat?.chat?.user1?.name
                        : chat?.chat?.user2?.name
                    }
                    subText={
                      user.uid === chat?.chat?.user2?._id
                        ? chat?.chat?.user1?.username
                        : chat?.chat?.user2?.username
                    }
                  />
                </div>
              ))}

              <div className={s.mensajes__container__body__button}>
                <Button
                  onClick={() => {
                    openCloseModal();
                  }}
                >
                  Crear nuevo chat
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={s.mensajes__mensajes}>
          <div className={s.mensajes__mensajes__header}>
            <Link
              href={`/perfil/${
                user.uid === activeChat?.chat?.user2?._id
                  ? activeChat?.chat?.user1?.username
                  : activeChat?.chat?.user2?.username
              }`}
            >
              <Avatar
                src={
                  user.uid === activeChat?.chat?.user2?._id
                    ? activeChat?.chat?.user1?.photoURL
                    : activeChat?.chat?.user2?.photoURL
                }
                username={
                  user.uid === activeChat?.chat?.user2?._id
                    ? activeChat?.chat?.user1?.name
                    : activeChat?.chat?.user2?.name
                }
                subText={
                  user.uid === activeChat?.chat?.user2?._id
                    ? activeChat?.chat?.user1?.username
                    : activeChat?.chat?.user2?.username
                }
              />
            </Link>
          </div>

          <div className={s.mensajes__mensajes__body}>
            {activeChat?.chat?.messages?.map((message, index) => (
              <div
                className={
                  user?.uid === message?.sender?._id
                    ? s.mensajes__mensajes__body__sender
                    : s.mensajes__mensajes__body__receiver
                }
                key={index}
              >
                <Avatar src={message?.sender?.photoURL} size={28} />
                <p className={s.mensajes__mensajes__body__sender__text}>
                  {message.message}
                </p>
              </div>
            ))}
            {/* <div className={`${s.mensajes__mensajes__body__sender}`}>
              <Avatar src={user?.photoURL} size={28} />
              <p className={s.mensajes__mensajes__body__sender__text}>
                Hola, como estas?
              </p>
            </div>
            <div className={s.mensajes__mensajes__body__receiver}>
              <Avatar src={activeUser?.photoURL} size={28} />
              <p className={s.mensajes__mensajes__body__receiver__text}>
                Hola, como estas?
              </p>
            </div> */}
          </div>

          <form
            className={s.mensajes__mensajes__footer}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Input
              inputType="secondary"
              type="text"
              name="message"
              value={formState?.message}
              placeholder="Escribe un mensaje"
              className={s.mensajes__mensajes__footer__input}
              onChange={onInputChange}
            />

            <Button type="submit" className={s.mensajes__mensajes__footer__btn}>
              Enviar
            </Button>
          </form>
        </div>
      </div>

      <CreateChatModal />
    </Layout>
  );
}

export default withAuth(Mensajes);
