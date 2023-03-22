import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Text } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { generatePath, useNavigate } from 'react-router-dom';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import classes from './ArticleListItem.module.scss';
import {
  Article,
  ArticleBlockType, ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';

export interface ArticleListItemProps {
  className?: string;
  article: Article
  view: ArticleView
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onOpenArticle = useCallback(() => {
    navigate(generatePath(RoutePath.articleDetails, { id: article.id }));
  }, [navigate, article.id]);

  const typesText = <Text text={article.type.join(', ')} className={classes.types} />;

  const viewsText = <Text text={article.views.toString()} className={classes.views} />;

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div className={classnames(classes.ArticleListItem, {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={classes.username} />
            <Text text={article.createdAt} className={classes.date} />
          </div>
          <Text title={article.title} className={classes.title} />
          {typesText}
          <img src={article.img} className={classes.image} alt={article.title} />
          {textBlock && (
            <ArticleTextBlockComponent block={textBlock} className={classes.textBlock} />
          )}
          <div className={classes.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
              {t('Читать далее')}
            </Button>
            {viewsText}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classnames(classes.ArticleListItem, {}, [className, classes[view]])}>
      <Card onClick={onOpenArticle}>
        <div className={classes.imageWrapper}>
          <img src={article.img} className={classes.image} alt={article.title} />
          <Text text={article.createdAt} className={classes.date} />
        </div>
        <div className={classes.infoWrapper}>
          {typesText}
          {viewsText}
        </div>
        <Text text={article.title} className={classes.title} />
      </Card>
    </div>
  );
});
