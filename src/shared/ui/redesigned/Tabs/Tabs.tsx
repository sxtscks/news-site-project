import React, { memo, ReactNode, useCallback } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Card } from '../Card/Card';
import classes from './Tabs.module.scss';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
  value: string;
  content: ReactNode;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tabs: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const onClick = useCallback(
    (tab: TabItem) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <Flex
      className={classnames(classes.Tabs, {}, [className])}
      direction={direction}
      gap="8"
      align="start"
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            className={classnames('', {
              [classes.selected]: isSelected,
            })}
            variant={isSelected ? 'light' : 'normal'}
            key={tab.value}
            onClick={onClick(tab)}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
