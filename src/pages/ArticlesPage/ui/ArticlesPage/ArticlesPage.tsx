import React, { FC, memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlePageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import classes from './ArticlesPage.module.scss';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

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

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyLayout
          right={<FiltersContainer />}
          content={
            <Page
              className={classnames(classes.ArticlesPageRedesigned, {}, [
                className,
              ])}
              onScrollEnd={onLoadNextPart}
              dataTestId="ArticlesPage"
            >
              <ArticleInfiniteList className={classes.list} />
            </Page>
          }
          left={<ViewSelectorContainer />}
        />
      }
      off={
        <Page
          className={classnames(classes.ArticlesPage, {}, [className])}
          onScrollEnd={onLoadNextPart}
          dataTestId="ArticlesPage"
        >
          <ArticlesPageFilters />
          <ArticleInfiniteList className={classes.list} />
        </Page>
      }
    />
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
