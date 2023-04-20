import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
  test('should return profile data', () => {
    const data = {
      username: 'admin',
      firstname: 'Test',
      lastname: 'Test',
      age: 26,
      country: Country.RUSSIA,
      currency: Currency.EUR,
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
});
