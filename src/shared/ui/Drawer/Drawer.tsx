import React, { memo, ReactNode } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classnames, Modes } from 'shared/lib/classnames/classnames';
import { Overlay } from '../Overlay/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const {
    className,
    children,
    onClose,
    isOpen,
  } = props;
  const { theme } = useTheme();

  const mods: Modes = {
    [cls.opened]: isOpen,
  };

  return (
    <Portal>
      <div className={classnames(cls.Drawer, mods, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <div
          className={cls.content}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
});
