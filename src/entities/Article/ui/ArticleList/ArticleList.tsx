import React, { memo } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import {
  ArticleListItemSkeleton,
} from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import classes from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';

export interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <ArticleListItemSkeleton key={index} view={view} />
  ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL,
  } = props;
  const { t } = useTranslation('articles');

  const renderArticle = (article: Article, index: number) => (
    <ArticleListItem
      key={index}
      article={article}
      view={view}
    />
  );

  if (!isLoading && !articles.length) {
    return (
      <div className={classnames('', {}, [className, classes[view]])}>
        <Text size={TextSize.L} title={t('Статьи не найдены')} />
      </div>
    );
  }

  return (
    <div className={classnames('', {}, [className, classes[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
