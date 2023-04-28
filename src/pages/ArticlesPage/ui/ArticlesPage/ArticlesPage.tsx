import React, { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import {
  useInitialEffect,
} from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  initArticlesPage,
} from '../../model/services/initArticlesPage/initArticlesPage';
import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlePageSlice';
import {
  ArticlesPageFilters,
} from '../ArticlesPageFilters/ArticlesPageFilters';
import classes from './ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

export interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducerList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        className={classnames(classes.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
      >
        <ArticlesPageFilters />
        <ArticleInfiniteList className={classes.list} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
