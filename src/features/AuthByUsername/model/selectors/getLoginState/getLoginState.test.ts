import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getLoginState', () => {
  test('should return user name', () => {
    const state: DeepPartial<StateSchema> = {
      auth: {
        username: 'admin',
        password: '123',
        isLoading: false,
        error: '',
      },
    };
    expect(getLoginState(state as StateSchema)).toEqual({
      username: 'admin',
      password: '123',
      isLoading: false,
      error: '',
    });
  });
  test('should work with empty user name', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginState(state as StateSchema)).toEqual(undefined);
  });
});
