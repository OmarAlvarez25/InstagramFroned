// React
import { useState } from 'react';

// MUI Components
import { Modal } from '@mui/material';

// Hooks
import {
  useAuthStore,
  useChatsStore,
  useUiStore,
  useUsersStore,
} from '@/hooks';

// UI Components
import { Button, Input, Select } from '@/components/ui';

// Styles
import s from './CreateChatModal.module.scss';

function CreateChatModal() {
  const { user } = useAuthStore();

  const { isModalOpen, openCloseModal } = useUiStore();

  const { users } = useUsersStore();

  const { startSavingChat } = useChatsStore();

  const [messageSend, setMessageSend] = useState('');
  const [user2, setUser2] = useState('');

  const [formState, setFormState] = useState({
    chat: {
      messages: [
        {
          message: messageSend,
          sender: user.uid,
        },
      ],

      user1: user.uid,
      user2: '',
    },
  });

  const onInputChangeMessage = (e) => {
    setFormState({
      ...formState,
      chat: {
        ...formState.chat,
        messages: [
          {
            message: e.target.value,
            sender: user.uid,
          },
        ],
      },
    });
  };

  const onInputChangeUser2 = (e) => {
    setFormState({
      ...formState,
      chat: {
        ...formState.chat,
        user2: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startSavingChat(formState);

    openCloseModal();
  };

  return (
    <Modal
      disableScrollLock
      open={isModalOpen}
      onClose={() => {
        openCloseModal();
      }}
    >
      <div className={s.createChatModal}>
        <h1 className={s.createChatModal__title}>Crear Chat</h1>

        <form className={s.createChatModal__form} onSubmit={handleSubmit}>
          <Select
            title="Para"
            name="user2"
            SelectType="secondary"
            onChange={onInputChangeUser2}
          >
            <option value="">Seleccione un usuario</option>
            {users?.map((user) => (
              <option key={user.uid} value={user.uid}>
                {user.name}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            title="Mensaje"
            name="message"
            inputType="secondary"
            placeholder="Escriba un mensaje"
            onChange={onInputChangeMessage}
          />

          <Button
            type="submit"
            className={s.createChatModal__button}
            style={{
              marginTop: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Crear chat
          </Button>
        </form>
      </div>
    </Modal>
  );
}

export default CreateChatModal;
