import React, { ButtonHTMLAttributes, FC } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
  XL = 'size_xl',
  L = 'size_l',
  M = 'size_m'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  square?: boolean
  size?: ButtonSize
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    theme,
    children,
    square,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  const modes: Record<string, boolean> = {
    [classes.square]: square,
    [classes[size]]: true,
  };

  return (
    <button
      type="button"
      className={classnames(classes.button, modes, [className, classes[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};
