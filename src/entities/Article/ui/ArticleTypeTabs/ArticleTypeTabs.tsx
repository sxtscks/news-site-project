import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  TabItem,
  Tabs as TabsDeprecated,
} from '@/shared/ui/deprecated/Tabs/Tabs';
import { ArticleType } from '../../model/types/article';
import classes from './ArticleTypeTabs.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs/Tabs';

export interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChange: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChange } = props;
  const { t } = useTranslation('articles');

  const tabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('Все'),
      },
      {
        value: ArticleType.IT,
        content: t('Айти'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Наука'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Экономика'),
      },
    ],
    [t]
  );

  const onChangeType = useCallback(
    (tab: TabItem) => {
      onChange(tab.value as ArticleType);
    },
    [onChange]
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs
          className={classnames(classes.ArticleTypeTabsRedesigned, {}, [
            className,
          ])}
          tabs={tabs}
          value={value}
          onTabClick={onChangeType}
          direction="column"
        />
      }
      off={
        <TabsDeprecated
          className={classnames(classes.ArticleTypeTabs, {}, [className])}
          tabs={tabs}
          value={value}
          onTabClick={onChangeType}
        />
      }
    />
  );
});
