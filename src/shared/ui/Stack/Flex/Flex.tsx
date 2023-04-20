import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classnames, Modes } from '@/shared/lib/classnames/classnames';
import classes from './Flex.module.scss';

export type FlexJustify = 'center' | 'start' | 'end' | 'between';
export type FlexAlign = 'center' | 'start' | 'end';
export type FlexDirection = 'column' | 'row';
export type FlexGap = '4' | '8' | '16' | '32';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const justifyClasses: Record<FlexJustify, string> = {
  start: classes.justifyStart,
  center: classes.justifyCenter,
  end: classes.justifyEnd,
  between: classes.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: classes.alignStart,
  center: classes.alignCenter,
  end: classes.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
  row: classes.directionRow,
  column: classes.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: classes.gap4,
  8: classes.gap8,
  16: classes.gap16,
  32: classes.gap32,
};
export interface FlexProps extends DivProps{
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
  } = props;

  const classesList = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const modes: Modes = {
    [classes.max]: max,
  };

  return (
    <div className={classnames(classes.Flex, modes, classesList)}>
      {children}
    </div>
  );
};
