// React

// Next
import Link from 'next/link';
import Image from 'next/image';

// Styles
import s from './Button.module.scss';

export const Button = ({
  buttonType,
  children,
  className,
  href,
  icon,
  iconAlt,
  size = 20,
  ...props
}) => {
  return href ? (
    <Link
      href={href}
      className={`${
        buttonType === 'secondary' ? s.button__secondary : s.button__primary
      } ${className}`}
    >
      {icon && (
        <div className={s.button__icon}>
          <Image src={icon} alt={iconAlt || icon} width={size} height={size} />
        </div>
      )}
      {children}
    </Link>
  ) : (
    <button
      {...props}
      className={`${
        buttonType === 'secondary' ? s.button__secondary : s.button__primary
      } ${className}`}
    >
      {icon && (
        <div className={s.button__icon}>
          <Image src={icon} alt={iconAlt || icon} width={size} height={size} />
        </div>
      )}
      {children}
    </button>
  );
};
