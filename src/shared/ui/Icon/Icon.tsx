import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Icon.module.scss';

export interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg } = props;

  return (
    <Svg className={classnames(classes.Icon, {}, [className])} />
  );
});
