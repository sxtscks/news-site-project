import React, { HTMLAttributes, memo, ReactNode } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'normal';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  fullWidth?: boolean;
  fullHeight?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap_0',
  '8': 'gap_8',
  '16': 'gap_16',
  '24': 'gap_24',
};

export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = 'normal',
    fullWidth,
    fullHeight,
    padding = '8',
    border = 'normal',
    ...otherProps
  } = props;

  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classnames(
        classes.Card,
        {
          [classes.fullWidth]: fullWidth,
          [classes.fullHeight]: fullHeight,
        },
        [className, classes[variant], classes[paddingClass], classes[border]]
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
});
