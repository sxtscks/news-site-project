import React, { memo, ReactNode, useCallback } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card, CardTheme } from '../Card/Card';
import classes from './Tabs.module.scss';

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tabs: TabItem) => void;
}

/**
 * Устарел, используем новые компоненты из папки redesign
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick } = props;

  const onClick = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <div className={classnames(classes.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          key={tab.value}
          onClick={onClick(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
