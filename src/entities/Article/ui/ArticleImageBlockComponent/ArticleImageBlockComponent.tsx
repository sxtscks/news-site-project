import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Text, TextAlign } from '@/shared/ui/Text/Text';
import classes from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

export interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
  const { className, block } = props;
  const { t } = useTranslation('articles');

  return (
    <div
      className={classnames('', {}, [className])}
    >
      <img src={block.src} className={classes.image} alt={block.title} />
      {block.title && (
        <Text text={block.title} align={TextAlign.CENTER} />
      )}
    </div>
  );
});
