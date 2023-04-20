import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername', () => {
  test('should return user name', () => {
    const state: DeepPartial<StateSchema> = {
      auth: { username: 'admin' },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual('admin');
  });
  test('should work with empty error', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual('');
  });
});
