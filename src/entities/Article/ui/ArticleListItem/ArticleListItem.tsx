import React, { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Text } from '@/shared/ui/Text/Text';
import { Card } from '@/shared/ui/Card/Card';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation();

  const typesText = (
    <Text text={article?.type.join(', ')} className={classes.types} />
  );

  const viewsText = (
    <Text text={article?.views.toString()} className={classes.views} />
  );

  if (view === ArticleView.BIG) {
    const textBlock = article?.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <div
        className={classnames(classes.ArticleListItem, {}, [
          className,
          classes[view],
        ])}
      >
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article?.user.avatar} />
            <Text text={article?.user.username} className={classes.username} />
            <Text text={article?.createdAt} className={classes.date} />
          </div>
          <Text title={article?.title} className={classes.title} />
          {typesText}
          <AppImage
            fallback={<Skeleton width="100%" height="250px" />}
            src={article?.img}
            className={classes.image}
            alt={article?.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={classes.textBlock}
            />
          )}
          <div className={classes.footer}>
            <AppLink
              target={target}
              to={generatePath(RoutePath.articleDetails, { id: article.id })}
            >
              <Button theme={ButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
            </AppLink>
            {viewsText}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classnames('', {}, [className, classes[view]])}>
      <AppLink
        target={target}
        to={generatePath(RoutePath.articleDetails, { id: article.id })}
      >
        <Card>
          <div className={classes.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              src={article?.img}
              className={classes.image}
              alt={article?.title}
            />
            <Text text={article?.createdAt} className={classes.date} />
          </div>
          <div className={classes.infoWrapper}>
            {typesText}
            {viewsText}
          </div>
          <Text text={article?.title} className={classes.title} />
        </Card>
      </AppLink>
    </div>
  );
});
