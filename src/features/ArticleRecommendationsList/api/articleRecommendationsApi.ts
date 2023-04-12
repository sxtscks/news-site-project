import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';

const recsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecs: build.query<Article[], number>({
      query: (limit) => ({
        url: '/articles',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

export const { useGetArticleRecsQuery } = recsApi;
