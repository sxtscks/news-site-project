import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm', () => {
  test('should return profile form', () => {
    const form = {
      username: 'admin',
      firstname: 'Test',
      lastname: 'Test',
      age: 26,
      country: Country.RUSSIA,
      currency: Currency.EUR,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
});
