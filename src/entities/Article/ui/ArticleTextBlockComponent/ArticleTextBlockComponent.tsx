import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from 'shared/lib/classnames/classnames';
import { Text } from 'shared/ui/Text/Text';
import classes from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

export interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation('articles');

  return (
    <div
      className={classnames('', {}, [className])}
    >
      {block.title && (
        <Text title={block.title} className={classes.title} />
      )}
      {block.paragraphs.map((paragraph) => (
        <Text key={paragraph} text={paragraph} className={classes.paragraph} />
      ))}
    </div>
  );
});
