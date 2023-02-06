import React, {ButtonHTMLAttributes, FC} from 'react';
import {classnames} from "shared/lib/classnames/classnames";
import classes from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = 'clear'
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ThemeButton
}

export const Button: FC<ButtonProps> = (props) => {

  const {
    className,
    theme,
    children,
    ...otherProps
  } = props

  return (
    <button
      className={classnames(classes.button, {}, [className, classes[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  )
}