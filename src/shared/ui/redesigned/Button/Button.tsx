import React, { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
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
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const modes: Modes = {
    [classes.square]: square,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
    [classes.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
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
      <div className={classes.addonLeft}>{addonLeft}</div>
      {children}
      <div className={classes.addonRight}>{addonRight}</div>
    </button>
  );
});
