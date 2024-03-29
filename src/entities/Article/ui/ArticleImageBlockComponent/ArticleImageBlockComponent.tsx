import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import {
  Text as TextDeprecated,
  TextAlign,
} from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div className={classnames('', {}, [className])}>
        <img src={block.src} className={classes.image} alt={block.title} />
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text text={block.title} align="center" />}
            off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
          />
        )}
      </div>
    );
  }
);
