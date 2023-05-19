import React, { memo } from 'react';
import classes from './ScrollToolbar.module.scss';
import { classnames } from '@/shared/lib/classnames/classnames';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { ScrollToTopButton } from '@/features/ScrollToTopButton';

export interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classnames(classes.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
