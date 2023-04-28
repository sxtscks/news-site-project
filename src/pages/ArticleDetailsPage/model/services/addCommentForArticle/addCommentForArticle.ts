import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleDetailsData } from '@/entities/Article';

export const addCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async (commentText, thunkAPI) => {
    const {
      extra, rejectWithValue, getState, dispatch,
    } = thunkAPI;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !commentText || !article) {
      return rejectWithValue('No data');
    }

    try {
      const response = await extra.api.post<Comment>('/comments', {
        articleId: article.id,
        userId: userData.id,
        text: commentText,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(fetchCommentsByArticleId(article.id));

      return response.data;
    } catch (e) {
      return rejectWithValue('Error');
    }
  },
);
