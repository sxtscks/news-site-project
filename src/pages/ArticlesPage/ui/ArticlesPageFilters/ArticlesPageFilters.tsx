import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
  ArticleViewSelector,
} from '@/entities/Article';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import classes from './ArticlesPageFilters.module.scss';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation('articles');

  const {
    view,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    sort,
    order,
    onChangeType,
    type,
    onChangeSearch,
    search,
  } = useArticleFilters();

  return (
    <div className={classnames(classes.ArticlesPageFilters, {}, [className])}>
      <div className={classes.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={classes.search}>
        <Input
          placeholder={t('Поиск')}
          value={search}
          onChange={onChangeSearch}
        />
      </Card>
      <ArticleTypeTabs value={type as ArticleType} onChange={onChangeType} />
    </div>
  );
});
