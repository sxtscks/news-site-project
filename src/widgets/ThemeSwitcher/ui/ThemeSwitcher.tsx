import React, { memo, useCallback } from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { classnames } from '@/shared/lib/classnames/classnames';
import ThemeIconDeprecated from '@/shared/assets/icons/themeLight.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

export interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Icon
          Svg={ThemeIcon}
          width={40}
          height={40}
          clickable
          onClick={onToggle}
        />
      }
      off={
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          className={classnames('', {}, [className])}
          onClick={onToggle}
        >
          <IconDeprecated
            Svg={ThemeIconDeprecated}
            width={40}
            height={40}
            inverted
          />
        </ButtonDeprecated>
      }
    />
  );
});
