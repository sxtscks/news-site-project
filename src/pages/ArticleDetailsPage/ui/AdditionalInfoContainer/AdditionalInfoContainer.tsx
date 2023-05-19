import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import classes from './AdditionalInfoContainer.module.scss';

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);

  if (!article) {
    return null;
  }

  return (
    <Card padding="24" border="round" className={classes.card}>
      <ArticleAdditionalInfo
        createdAt={article.createdAt}
        author={article.user}
        views={article.views}
      />
    </Card>
  );
});
