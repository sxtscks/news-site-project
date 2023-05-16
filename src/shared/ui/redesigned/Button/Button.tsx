import React, { ButtonHTMLAttributes, memo } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline';

export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    variant = 'outline',
    children,
    square,
    size = 'm',
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const modes: Modes = {
    [classes.square]: square,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classnames(classes.button, modes, [
        className,
        classes[variant],
        classes[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
