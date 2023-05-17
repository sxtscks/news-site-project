import React, { CSSProperties, memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Skeleton.module.scss';

export interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
  const { className, height, width, border } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classnames(classes.Skeleton, {}, [className])}
      style={styles}
    />
  );
});
