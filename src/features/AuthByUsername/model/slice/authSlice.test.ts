import { AuthSchema } from '../types/authSchema';
import { authActions, authReducer } from './authSlice';

describe('authSlice', () => {
  test('set username', () => {
    const state: DeepPartial<AuthSchema> = {
      username: 'admin',
    };
    expect(authReducer(
      state as AuthSchema,
      authActions.setUsername('admin'),
    )).toEqual({ username: 'admin' });
  });
  test('set password', () => {
    const state: DeepPartial<AuthSchema> = {
      password: '123',
    };
    expect(authReducer(
      state as AuthSchema,
      authActions.setPassword('123'),
    )).toEqual({ password: '123' });
  });
});
