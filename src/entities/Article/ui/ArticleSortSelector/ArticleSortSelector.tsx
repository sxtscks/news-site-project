import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '../../model/types/article';
import classes from './ArticleSortSelector.module.scss';

export interface ArticleSortSelectorProps {
  className?: string;
  sort?: ArticleSortField;
  order?: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, sort, order, onChangeSort, onChangeOrder } = props;
  const { t } = useTranslation('articles');

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('возрастанию'),
      },
      {
        value: 'desc',
        content: t('убыванию'),
      },
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t('Дате создания'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('Названию'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('Просмотрам'),
      },
    ],
    [t]
  );

  return (
    <div className={classnames(classes.ArticleSortSelector, {}, [className])}>
      <Select
        value={sort}
        label={t('Сортировать по')}
        options={sortFieldOptions}
        onChange={onChangeSort}
      />
      <Select
        value={order}
        label={t('По')}
        options={orderOptions}
        onChange={onChangeOrder}
      />
    </div>
  );
});
