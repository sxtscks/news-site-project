import { rtkApi } from 'shared/api/rtkApi';

const recsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecs: build.query({
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
