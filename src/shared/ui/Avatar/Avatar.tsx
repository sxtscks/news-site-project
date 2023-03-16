import React, { CSSProperties, FC, useMemo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Avatar.module.scss';

export interface AvatarProps {
  className?: string
  src?: string
  size?: number
}

export const Avatar: FC<AvatarProps> = ({ className, src, size }) => {
  const styles = useMemo<CSSProperties>(() => ({
    width: size || 100,
    height: size || 100,
  }), [size]);

  return (
    <img
      className={classnames(classes.avatar, {}, [className])}
      src={src}
      style={styles}
      alt="Avatar"
    />
  );
};
