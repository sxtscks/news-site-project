import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError', () => {
  test('should return profile error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: '123',
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual('123');
  });
});
