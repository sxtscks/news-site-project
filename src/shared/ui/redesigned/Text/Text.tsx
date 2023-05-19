import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './Text.module.scss';

export type TextVariant = 'primary' | 'accent' | 'error';

export type TextAlign = 'center' | 'right' | 'left';

export type TextSize = 'size_s' | 'size_m' | 'size_l';

export interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  dataTestId?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  size_s: 'h3',
  size_m: 'h2',
  size_l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'size_m',
    dataTestId = 'Text',
    bold,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={classnames('', { [classes.bold]: bold }, [
        className,
        classes[variant],
        classes[align],
        classes[size],
      ])}
    >
      {title && (
        <HeaderTag
          data-testid={`${dataTestId}.Header`}
          className={classes.title}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={classes.text}>
          {text}
        </p>
      )}
    </div>
  );
});
