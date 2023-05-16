import React, { CSSProperties, FC, useMemo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Avatar.module.scss';
import { AppImage } from '../AppImage';

export interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Avatar: FC<AvatarProps> = ({ className, src, size }) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size || 100,
      height: size || 100,
    }),
    [size]
  );

  return (
    <AppImage
      className={classnames(classes.avatar, {}, [className])}
      src={src}
      style={styles}
      alt="Avatar"
    />
  );
};
