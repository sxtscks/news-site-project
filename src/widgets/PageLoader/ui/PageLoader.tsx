import React, { FC } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Loader } from '@/shared/ui/Loader/Loader';
import classes from './PageLoader.module.scss';

export interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => (
  <div className={classnames(classes.container, {}, [className])}>
    <Loader />
  </div>
);
