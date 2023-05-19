import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

export interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Icon
      className={className}
      width={32}
      height={32}
      clickable
      onClick={onClick}
      Svg={CircleIcon}
    />
  );
});
