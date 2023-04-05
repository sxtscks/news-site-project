import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../types/profile';
import { getProfileValidateError } from './getProfileValidateError';

describe('getProfileReadonly', () => {
  test('should return profile readonly status', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [ValidateProfileError.NO_DATA],
      },
    };
    expect(getProfileValidateError(state as StateSchema)).toEqual([ValidateProfileError.NO_DATA]);
  });
});
