// React

// Next

// Styles
import s from './Select.module.scss';

export const Select = ({
  SelectType,
  children,
  className,
  title,
  htmlfor,
  ...props
}) => {
  return (
    <>
      {title && <p className={s.labelTitle}>{title}</p>}
      {htmlfor && <p className={s.labelTitle}>{htmlfor}</p>}

      <select
        {...props}
        className={`${
          SelectType === 'secondary' ? s.input__secondary : s.input__primary
        } ${className}`}
      >
        {children}
      </select>
    </>
  );
};
