import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import classes from './ArticlesFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleTypeTabs,
} from '@/entities/Article';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { VStack } from '@/shared/ui/redesigned/Stack/VStack/VStack';
import { SortOrder } from '@/shared/types/sort';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

export interface ArticlesFiltersProps {
  className?: string;
  sort?: ArticleSortField;
  order?: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  typeValue?: ArticleType;
  onChangeType: (type: ArticleType) => void;
  search?: string;
  onChangeSearch: (search: string) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    onChangeSort,
    onChangeOrder,
    order,
    onChangeSearch,
    search,
    typeValue,
    onChangeType,
  } = props;
  const { t } = useTranslation();

  return (
    <Card
      className={classnames(classes.ArticlesFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          placeholder={t('Поиск')}
          value={search}
          onChange={onChangeSearch}
          size="s"
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          value={typeValue as ArticleType}
          onChange={onChangeType}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
      </VStack>
    </Card>
  );
});
