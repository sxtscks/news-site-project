import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleList } from '@/entities/Article';
import { getArticles } from '../../model/slice/articlePageSlice';
import {
  getArticlesIsLoading,
  getArticlesView,
} from '../../model/selectors/articles';

export interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesIsLoading);
  const view = useSelector(getArticlesView);

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});
