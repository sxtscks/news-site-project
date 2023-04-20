import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!user || !article) {
      return false;
    }
    return article.user.id === user.id;
  },
);
