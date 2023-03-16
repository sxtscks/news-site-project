import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from './articleDetails';

describe('articleDetailsData', () => {
  test('should return article data', () => {
    const data = {
      id: '1',
      title: 'Javascript new',
      subtitle: 'Что нового в JS за 2022',
    };
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data,
      },
    };
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
  });

  test('should return article loading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    };
    expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
  });

  test('should return article error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'Error',
      },
    };
    expect(getArticleDetailsError(state as StateSchema)).toEqual('Error');
  });
});
