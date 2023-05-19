import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import classes from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/types/article';
import { toggleFeatures } from '@/shared/lib/features';

export interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton = memo(
  (props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    const mainClass = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => classes.ArticleListItemRedesigned,
      off: () => classes.ArticleListItem,
    });

    const Skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => SkeletonRedesigned,
      off: () => SkeletonDeprecated,
    });

    const Card = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => CardRedesigned,
      off: () => CardDeprecated,
    });

    if (view === ArticleView.BIG) {
      return (
        <div className={classnames(mainClass, {}, [className, classes[view]])}>
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
      <div className={classnames(mainClass, {}, [className, classes[view]])}>
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
  }
);
