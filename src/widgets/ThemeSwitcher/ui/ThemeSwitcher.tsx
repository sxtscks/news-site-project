import React, { memo } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classnames } from 'shared/lib/classnames/classnames';
import DarkIcon from 'shared/assets/icons/themeDark.svg';
import LightIcon from 'shared/assets/icons/themeLight.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

export interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classnames('', {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
