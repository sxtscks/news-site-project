import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Code } from '@/shared/ui/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';

export interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation('articles');

    return (
      <div className={classnames('', {}, [className])}>
        <Code content={block.code} />
      </div>
    );
  }
);
