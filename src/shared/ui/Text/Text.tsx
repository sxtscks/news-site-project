import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error'
}
export enum TextAlign {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left'
}
export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}
export interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={
        classnames(
          '',
          {},
          [className, classes[theme], classes[align], classes[size]],
        )
      }
    >
      {title && <HeaderTag className={classes.title}>{title}</HeaderTag>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});
