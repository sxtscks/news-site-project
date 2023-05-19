import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import classes from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

export interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div className={classnames('', {}, [className])}>
        {block.title && (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={<Text title={block.title} className={classes.title} />}
            off={
              <TextDeprecated title={block.title} className={classes.title} />
            }
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <ToggleFeatures
            feature="isAppRedesigned"
            on={
              <Text
                key={paragraph}
                text={paragraph}
                className={classes.paragraph}
              />
            }
            off={
              <TextDeprecated
                key={paragraph}
                text={paragraph}
                className={classes.paragraph}
              />
            }
          />
        ))}
      </div>
    );
  }
);
