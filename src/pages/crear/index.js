/* eslint-disable @next/next/no-img-element */
// React
import { useState, useRef } from 'react';

// Next
import Image from 'next/image';

// Hooks
import { useAuthStore, usePostsStore } from '@/hooks';

// Local Components
import withAuth from '@/auth/withAuth';
import { Layout } from '@/components';

// UI Component
import { Button, Input } from '@/components/ui';

// Sonner Notification
import { toast } from 'sonner';

// Styles
import s from './Crear.module.scss';

function Crear() {
  const { startUploadingFiles, startDeletingFile, startSavingPost } =
    usePostsStore();

  const { user } = useAuthStore();

  const [formValues, setFormValues] = useState({
    postImg: [],
    postDesc: '',
    postDate: new Date().toISOString().split('T')[0],
    postLikes: [],
    postComments: [],
    postTime: Date.now().toString(),
    owner: {
      uid: user.uid,
      username: user.username,
      photoURL: user.photoURL,
      name: user.name,
    },
  });

  const fileInput = useRef(null);

  // onFileInputChange
  const onFileInputChange = async (e) => {
    const { files } = e.currentTarget;

    if (!files[0]) return;

    // do not allow file with type different than image
    if (!files[0].type.includes('image')) {
      toast.error('Solo se permiten imagenes');
      return;
    }

    const fileURL = await startUploadingFiles(files);

    setFormValues({
      ...formValues,
      postImg: fileURL[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // do not send if there is no image
    if (!formValues?.postImg?.url) {
      toast.error('No se puede crear un post sin imagen');
      return;
    }

    await startSavingPost(formValues);

    setFormValues({
      postImg: [],
      postDesc: '',
      postDate: new Date().toISOString().split('T')[0],
      postLikes: [],
      postComments: [],
      postTime: Date.now().toString(),
      owner: {
        uid: user.uid,
        username: user.username,
        photoURL: user.photoURL,
        name: user.name,
      },
    });
  };

  return (
    <Layout pageTitle="Crear Post">
      <div className={s.crear}>
        <h1 className={s.crear__title}>Crear Post</h1>

        <form
          className={s.crear__form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {!formValues?.postImg?.url ? (
            <>
              <input
                type="file"
                name="files"
                ref={fileInput}
                // only allow images
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
                className={s.crear__form__input}
                onChange={onFileInputChange}
              />

              <div
                className={s.crear__form__group}
                onClick={() => {
                  fileInput.current?.click();
                }}
              >
                <div className={s.crear__form__group__icon}>
                  <Image
                    src="/icons/globals/upload.svg"
                    alt="Upload images"
                    width={25}
                    height={25}
                  />
                </div>

                <div>
                  <p className={s.crear__form__group__text}>
                    Selecciona tu imagen y súbela.
                  </p>
                  <p className={s.crear__form__group__subText}>
                    PNG, JPG, JPEG
                  </p>
                </div>
              </div>
            </>
          ) : (
            <Button
              type="button"
              onClick={async () => {
                await startDeletingFile(formValues?.postImg.id);
                setFormValues({
                  ...formValues,
                  postImg: [],
                });
              }}
              className={s.crear__form__button__delete}
            >
              Eliminar Imagen
            </Button>
          )}

          {formValues?.postImg.url && (
            <>
              <div className={s.crear__form__info}>
                <div className={s.crear__form__info__preview}>
                  <img
                    key={formValues?.postImg.id}
                    src={formValues?.postImg.url}
                    alt="Post Image"
                    width="100%"
                  />
                </div>

                <div className={s.crear__form__info__container}>
                  <Input
                    type="text"
                    name="postDesc"
                    placeholder="Descripción"
                    inputType="secondary"
                    className={s.crear__form__input}
                    value={formValues?.postDesc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button type="submit" className={s.crear__form__button}>
                Crear Post
              </Button>
            </>
          )}
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(Crear);
