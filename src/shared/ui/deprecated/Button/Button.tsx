import React, { ButtonHTMLAttributes, memo } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outlineRed',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  XL = 'size_xl',
  L = 'size_l',
  M = 'size_m',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Button = memo((props: ButtonProps) => {
  const {
    className,
    theme = ButtonTheme.OUTLINE,
    children,
    square,
    size = ButtonSize.M,
    disabled,
    fullWidth,
    ...otherProps
  } = props;

  const modes: Modes = {
    [classes.square]: square,
    [classes[size]]: true,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth,
  };

  return (
    <button
      type="button"
      className={classnames(classes.button, modes, [className, classes[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
