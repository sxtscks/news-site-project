import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articlesPageActions } from '../../../model/slice/articlePageSlice';
import {
  fetchArticlesList,
} from '../../../model/services/fetchArticlesList/fetchArticlesList';
import { getArticlesPageInited } from '../../../model/selectors/articles';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlePage/initArticlesPage',
  async (_, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;
    const inited = getArticlesPageInited(getState());

    if (!inited) {
      dispatch(articlesPageActions.initState());
      dispatch(fetchArticlesList({
        page: 1,
      }));
    }
  },
);
