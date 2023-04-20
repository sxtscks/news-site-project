import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

const data = {
  username: 'admin',
  firstname: 'Test',
  lastname: 'Test',
  age: 26,
  country: Country.RUSSIA,
  currency: Currency.EUR,
};

describe('validateProfileData', () => {
  test('success validate', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without firstname and lastname', async () => {
    const result = validateProfileData({ ...data, firstname: undefined, lastname: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test('without age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });
});
