import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  firstname: 'john',
  lastname: 'duke',
  age: 24,
  city: 'Moscow',
  username: 'john111',
  country: Country.RUSSIA,
  currency: Currency.RUB,
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'john111',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('EditableProfileCard', () => {
  test('Edit mode', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument();
  });

  test('Cancel must return all values to initial state', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.UsernameInput'));
    await userEvent.type(
      screen.getByTestId('ProfileCard.UsernameInput'),
      'abcde'
    );

    expect(screen.getByTestId('ProfileCard.UsernameInput')).toHaveValue(
      'abcde'
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    );

    expect(screen.getByTestId('ProfileCard.UsernameInput')).toHaveValue(
      'john111'
    );
  });

  test('PUT request after saving', async () => {
    const mockPutReq = jest.spyOn(api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    );

    await userEvent.type(
      screen.getByTestId('ProfileCard.UsernameInput'),
      'abcde'
    );

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
