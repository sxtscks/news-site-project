import React, { memo, useCallback } from 'react';
import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import { classnames } from '@/shared/lib/classnames/classnames';
import DarkIcon from '@/shared/assets/icons/themeDark.svg';
import LightIcon from '@/shared/assets/icons/themeLight.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classnames('', {}, [className])}
      onClick={onToggle}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
