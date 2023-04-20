import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

export interface ArticleDetailsPageRecommendations extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}
