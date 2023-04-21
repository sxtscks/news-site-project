import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
  useGetArticleRatingQuery,
  useRateArticleMutation,
} from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  id: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, id } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);

  const { data, isLoading } = useGetArticleRatingQuery({
    articleId: id,
    userId: userData?.id ?? '',
  });

  const [rateArticleMutation] = useRateArticleMutation();

  const rating = data?.[0];

  const handleRateArticle = (starsCount: number, feedback?: string) => {
    rateArticleMutation({
      articleId: id,
      rate: starsCount,
      userId: userData?.id ?? '',
      feedback,
    });
  };

  const onCancel = (starsCount: number) => {
    handleRateArticle(starsCount);
  };

  const onConfirm = (starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback);
  };

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      className={className}
      rate={rating?.rate}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте ваш отзыв о статье')}
      onCancel={onCancel}
      onConfirm={onConfirm}
      hasFeedback
    />

  );
});
