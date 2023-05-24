// Next

// Next
import Image from 'next/image';

// Styles
import s from './Avatar.module.scss';

export const Avatar = ({
  src,
  size = 50,
  alt,
  username,
  subText,
  className,
  classNameText,
  classNameImg,
  classNamesubText,
}) => {
  return (
    // Se puede mejorar
    <div className={`${s.avatar} ${className}`}>
      <Image
        src={src || `https://source.boringavatars.com/marble/120/${username}`}
        alt={alt || `${username} Avatar`}
        width={size}
        height={size}
        className={`${s.avatar__img} ${classNameImg}`}
      />
      {username && (
        <div className={s.avatar__info}>
          {username && (
            <p className={`${s.avatar__info__name} ${classNameText}`}>
              {username}
            </p>
          )}
          {subText && (
            <p className={`${s.avatar__info__subText} ${classNamesubText}`}>
              {subText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
