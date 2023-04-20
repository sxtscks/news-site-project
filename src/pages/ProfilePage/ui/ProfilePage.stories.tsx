import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  ThemeDecorator,
} from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import {
  StoreDecorator,
} from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/test/avatar.jpg';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
  <ProfilePage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      firstname: 'Test',
      lastname: 'Test',
      age: 26,
      country: Country.RUSSIA,
      currency: Currency.EUR,
      avatar: AvatarImg,
    },
  },
})];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      firstname: 'Test',
      lastname: 'Test',
      age: 26,
      country: Country.RUSSIA,
      currency: Currency.EUR,
      avatar: AvatarImg,
    },
  },
})];
