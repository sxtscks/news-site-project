import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import ListIconDeprecated from '@/shared/assets/icons/list.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled.svg';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';

import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import classes from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/types/article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';

export interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => TileIcon,
      off: () => TiledIconDeprecated,
    }),
  },
  {
    view: ArticleView.BIG,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card
          className={classnames(classes.ArticleViewSelectorRedesigned, {}, [
            className,
          ])}
          border="round"
        >
          <HStack gap="8">
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                Svg={viewType.icon}
                className={classnames('', {
                  [classes.notSelected]: viewType.view !== view,
                })}
                onClick={onClick(viewType.view)}
                clickable
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div
          className={classnames(classes.ArticleViewSelector, {}, [className])}
        >
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              theme={ButtonTheme.CLEAR}
              onClick={onClick(viewType.view)}
            >
              <IconDeprecated
                Svg={viewType.icon}
                className={classnames('', {
                  [classes.notSelected]: viewType.view !== view,
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
