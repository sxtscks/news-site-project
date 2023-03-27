import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesIsLoading = (
  state: StateSchema,
) => state?.articlesPage?.isLoading ?? false;
export const getArticlesError = (
  state: StateSchema,
) => state?.articlesPage?.error;
export const getArticlesView = (
  state: StateSchema,
) => state?.articlesPage?.view;
export const getArticlesPageNumber = (
  state: StateSchema,
) => state?.articlesPage?.page ?? 1;
export const getArticlesPageLimit = (
  state: StateSchema,
) => state?.articlesPage?.limit;
export const getArticlesPageHasMore = (
  state: StateSchema,
) => state?.articlesPage?.hasMore;
export const getArticlesPageInited = (
  state: StateSchema,
) => state?.articlesPage?.inited;
