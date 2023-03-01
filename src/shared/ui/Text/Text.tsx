import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import classes from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}
export interface TextProps {
  className?: string
  title?: string
  text?: string
  theme?: TextTheme
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
  } = props;

  return (
    <div className={classnames('', {}, [className, classes[theme]])}>
      {title && <p className={classes.title}>{title}</p>}
      {text && <p className={classes.text}>{text}</p>}
    </div>
  );
});
