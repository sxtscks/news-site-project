import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { articleDetailsPageRecommendationsReducer } from '../slice/articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from '../slice/articleDetailsCommentsSlice';

export const articlesDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
