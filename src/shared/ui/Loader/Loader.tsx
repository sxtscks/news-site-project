import React, { FC } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import './Loader.scss';

export interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => (
  <div className={classnames('lds-ring', {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
);
