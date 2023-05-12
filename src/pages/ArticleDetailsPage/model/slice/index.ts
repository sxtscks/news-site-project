import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types/index';
import { articleDetailsPageRecommendationsReducer } from '../slice/articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from '../slice/articleDetailsCommentsSlice';

export const articlesDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
  });
