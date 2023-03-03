import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      auth: { error: 'Error' },
    };
    expect(getLoginError(state as StateSchema)).toBe('Error');
  });
  test('should work with empty error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toBe('');
  });
});
