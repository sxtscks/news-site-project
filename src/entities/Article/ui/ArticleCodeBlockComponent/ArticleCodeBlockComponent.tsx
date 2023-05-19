import React, { memo } from 'react';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Code } from '@/shared/ui/redesigned/Code/Code';
import { ArticleCodeBlock } from '../../model/types/article';

export interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div className={classnames('', {}, [className])}>
        <Code content={block.code} />
      </div>
    );
  }
);
