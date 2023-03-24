import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  articlesPageActions,
} from '../../../model/slice/articlePageSlice';
import {
  fetchArticlesList,
} from '../../../model/services/fetchArticlesList/fetchArticlesList';
import {
  getArticlesIsLoading,
  getArticlesPageHasMore,
  getArticlesPageLimit, getArticlesPageNumber,
} from '../../../model/selectors/articles';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articlePage/fetchNextArticlesPage',
  async (_, thunkAPI) => {
    const {
      getState, dispatch,
    } = thunkAPI;
    const hasMore = getArticlesPageHasMore(getState());
    const page = getArticlesPageNumber(getState());
    const limit = getArticlesPageLimit(getState());
    const isLoading = getArticlesIsLoading(getState());

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1));
      dispatch(fetchArticlesList({
        page: page + 1,
      }));
    }
  },
);
