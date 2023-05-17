import React, { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const {
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
    <ArticlesFilters
      className={className}
      typeValue={type}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
      onChangeSearch={onChangeSearch}
      search={search}
      onChangeType={onChangeType}
      sort={sort}
      order={order}
    />
  );
});
