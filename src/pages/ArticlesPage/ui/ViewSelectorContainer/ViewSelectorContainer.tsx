import React, { memo } from 'react';
import { ArticleViewSelector } from '@/entities/Article';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';

export interface ViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer = memo(
  (props: ViewSelectorContainerProps) => {
    const { className } = props;

    const { view, onChangeView } = useArticleFilters();

    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  }
);
