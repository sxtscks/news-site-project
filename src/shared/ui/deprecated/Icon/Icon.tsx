import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Icon.module.scss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      className={classnames(inverted ? classes.inverted : classes.Icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  );
});
