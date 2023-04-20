import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Icon.module.scss';

export interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted } = props;

  return (
    <Svg
      className={
        classnames(inverted ? classes.inverted : classes.Icon, {}, [className])
      }
    />
  );
});
