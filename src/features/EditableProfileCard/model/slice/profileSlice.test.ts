import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';
import { updateProfileData } from '../service/updateProfileData/updateProfileData';

import { profileActions, profileReducer } from './profileSlice';

const data = {
  username: 'admin',
  firstname: 'Test',
  lastname: 'Test',
  age: 26,
  country: Country.RUSSIA,
  currency: Currency.EUR,
};

describe('profileSlice', () => {
  test('set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.setReadonly(true),
    )).toEqual({ readonly: true });
  });
  test('cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.cancelEdit(),
    )).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data,
    });
  });
  test('update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
    expect(profileReducer(
      state as ProfileSchema,
      profileActions.updateProfile({
        username: '12345',
      }),
    )).toEqual({
      form: { username: '12345' },
    });
  });
  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR],
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.pending,
    )).toEqual({
      isLoading: true,
      validateError: undefined,
    });
  });
  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };
    expect(profileReducer(
      state as ProfileSchema,
      updateProfileData.fulfilled(data, ''),
    )).toEqual({
      isLoading: false,
      validateError: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
