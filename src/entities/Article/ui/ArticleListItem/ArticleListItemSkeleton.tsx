import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Text } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
  ArticleTextBlockComponent,
} from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/types/article';

export interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
  const { className, view } = props;

  if (view === ArticleView.BIG) {
    return (
      <div className={classnames(classes.ArticleListItem, {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton width={150} height={16} className={classes.username} />
            <Skeleton width={150} height={16} className={classes.date} />
          </div>
          <Skeleton width={250} height={24} className={classes.title} />
          <Skeleton height={200} className={classes.image} />
          <div className={classes.footer}>
            <Skeleton width={200} height={36} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classnames(classes.ArticleListItem, {}, [className, classes[view]])}>
      <Card>
        <div className={classes.imageWrapper}>
          <Skeleton width={200} height={200} className={classes.image} />
        </div>
        <div className={classes.infoWrapper}>
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width={150} height={16} className={classes.title} />
      </Card>
    </div>
  );
});
