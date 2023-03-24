import React, {
  memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import {
  useInfiniteScroll,
} from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import classes from './Page.module.scss';

export interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  return (
    <section
      ref={wrapperRef}
      className={classnames(classes.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
});
