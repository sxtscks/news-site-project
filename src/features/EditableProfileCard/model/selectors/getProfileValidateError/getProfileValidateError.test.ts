import { StateSchema } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';
import { getProfileValidateError } from './getProfileValidateError';

describe('getProfileReadonly', () => {
  test('should return profile readonly status', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [ValidateProfileError.NO_DATA],
      },
    };
    expect(getProfileValidateError(state as StateSchema)).toEqual([
      ValidateProfileError.NO_DATA,
    ]);
  });
});
