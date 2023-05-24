// React

// Next

// Styles
import s from './Input.module.scss';

export const Input = ({
  inputType,
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

      <input
        {...props}
        className={`${
          inputType === 'secondary' ? s.input__secondary : s.input__primary
        } ${className}`}
      ></input>
    </>
  );
};
