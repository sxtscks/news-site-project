import React, {FC} from 'react';
import {Theme, useTheme} from "app/providers/ThemeProvider";
import {classnames} from "shared/lib/classnames/classnames";
import classes from "./ThemeSwitcher.module.scss";
import DarkIcon from 'shared/assets/icons/theme-dark 1.svg'
import LightIcon from 'shared/assets/icons/theme-light 1.svg'
import {Button, ThemeButton} from "shared/ui/Button/Button";

export interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({className}) => {

  const {theme, toggleTheme} = useTheme()

  return (
    <Button
      theme={ThemeButton.CLEAR}
      className={classnames(classes.button, {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  )
}